from sqlalchemy import Column, Integer, String, Float
from database import Base


class AssessmentResult(Base):
    __tablename__ = "assessment_results"

    id = Column(Integer, primary_key=True, index=True)
    score = Column(Float)
    total_questions = Column(Integer)


class InterviewResult(Base):
    __tablename__ = "interview_results"

    id = Column(Integer, primary_key=True, index=True)
    score = Column(Float)
    feedback = Column(String)