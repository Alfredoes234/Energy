//! Run with
//!
//! ```not_rust
//! cargo run -p example-hello-world
//! ```

use axum::{response::{Html, IntoResponse}, routing::{get, get_service}, Json, Router, extract::{Query, Path}};
use serde::Deserialize;
use serde_json::{json, Value};
use tower_http::services::ServeDir;

pub const DB_URL: &str = "mysql://root:$2b4!p@localhost:3306/main";

#[tokio::main]
async fn main() {
    // build our application with a route
    let app = Router::new()
        .merge(routes())
        .fallback_service(routes_static());

    // run it
    let listener = tokio::net::TcpListener::bind("localhost:8080")
        .await
        .unwrap();
    println!("listening on http://{}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

// -- Routing Start -- 
fn routes() -> Router {
    Router::new()
        .route("/", get(index))
        .route("/json", get(json))
        .route("/hello", get(hello))
        .route("/hello2/:name", get(hello2))
}

fn routes_static() -> Router {
    Router::new().nest_service("/", get_service(ServeDir::new("./")))
}
// -- Routing End --
async fn index() -> Html<&'static str> {
    println!("{:<12} - main_Site", "HANDLER");
    Html("<p>Pirate</p>")
}

async fn json() -> Json<Value> {
    println!("{:<12} - json", "HANDLER");
    Json(json!({ 
        "id": 0, 
        "data": 42 
    }))
}

#[derive(Debug, Deserialize)]
struct HelloParams {
    name: Option<String>,
}

async fn hello(Query(params): Query<HelloParams>) -> impl IntoResponse {
    println!("{:<12} - handler_hello - {params:?}", "HANDLER");

    let name = params.name.as_deref().unwrap_or("World!");
    Html(format!("Hello <strong>{name}<strong"))
}


async fn hello2(Path(name): Path<String>) -> impl IntoResponse {
    println!("{:<12} - handler_hello - {name:?}", "HANDLER");

    Html(format!("Hello <strong>{name}<strong"))
} 