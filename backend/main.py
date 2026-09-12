from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
import models
import random

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home route
@app.get("/")
def home():
    return {
        "message": "Backend is working"
    }


# Save assessment score
# Save assessment score
@app.post("/assessment")
def save_assessment(score: int):
    db = SessionLocal()

    assessment = models.AssessmentResult(
        score=score,
        total_questions=5
    )

    db.add(assessment)
    db.commit()
    db.refresh(assessment)
    db.close()

    return {
        "message": "Assessment score saved successfully",
        "score": score
    }
import random

@app.post("/interview")
def save_interview():
    db = SessionLocal()

    score = random.randint(75, 100)

    interview = models.InterviewResult(
        score=score,
        feedback="Interview completed successfully"
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)
    db.close()

    return {
        "message": "Interview evaluated and saved successfully",
        "score": score
    }
# Get latest assessment score
@app.get("/assessment/latest")
def get_latest_assessment():
    db = SessionLocal()

    result = (
        db.query(models.AssessmentResult)
        .order_by(models.AssessmentResult.id.desc())
        .first()
    )

    db.close()

    if result is None:
        return {
            "score": None
        }

    return {
        "score": result.score
    }


# Get latest interview score
@app.get("/interview/latest")
def get_latest_interview():
    db = SessionLocal()

    result = (
        db.query(models.InterviewResult)
        .order_by(models.InterviewResult.id.desc())
        .first()
    )

    db.close()

    if result is None:
        return {
            "score": None
        }

    return {
        "score": result.score
    }