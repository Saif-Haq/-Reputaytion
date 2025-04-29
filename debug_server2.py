from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.get("/")
def read_root():
    return {"Hello": "World"}
    
@app.post("/api/interview-taylor")
async def interview_taylor(request: dict):
    return {"answer": "This is a test response from the debug server"}

if __name__ == "__main__":
    uvicorn.run("debug_server2:app", host="0.0.0.0", port=8088, reload=True) 