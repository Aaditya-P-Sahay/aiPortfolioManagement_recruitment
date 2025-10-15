/*
  # AI Advisor Recruitment System Database Schema

  ## Overview
  Creates tables for managing recruitment responses and admin summary for the AI Advisor project.

  ## New Tables Created
  
  ### 1. ai_advisor_recruitment_responses
  Main table storing all recruitment form submissions with:
  
  **System Fields:**
  - id (uuid, primary key) - Auto-generated unique identifier
  - created_at (timestamptz) - Submission timestamp
  - updated_at (timestamptz) - Last modification timestamp
  
  **Section 1: Basic Information**
  - full_name (varchar 255, required) - Student's full name
  - bits_id (varchar 50, required, unique) - University ID with unique constraint
  - email_id (varchar 255, required, unique) - Email with unique constraint
  - whatsapp_number (varchar 20, required) - WhatsApp contact
  
  **Section 2: Understanding the Task**
  - understanding_portfolio_analyzer (text, required) - Portfolio analyzer explanation
  - understanding_recommendation_engine (text, required) - Recommendation engine explanation
  - expected_recommendations (text, required) - Expected recommendation types
  - portfolio_analysis_requirements (text, required) - Required analysis information
  - first_milestone_idea (text, required) - First deliverable suggestion
  - rating_portfolio_management (integer 1-5, required) - Self-rating
  - rating_financial_markets (integer 1-5, required) - Self-rating
  - rating_python_programming (integer 1-5, required) - Self-rating
  - rating_data_analysis (integer 1-5, required) - Self-rating
  - rating_ml_ai_basics (integer 1-5, required) - Self-rating
  - financial_data_experience (text, optional) - Prior API/data experience
  
  **Section 3: Interest & Motivation**
  - motivation (text, required) - Project interest explanation
  - portfolio_status (varchar 50, required) - Current portfolio management status
  - portfolio_description (text, optional) - Portfolio details if applicable
  - innovative_idea (text, required) - Feature suggestion
  
  **Section 4: Commitment**
  - hours_commitment (varchar 20, required) - Weekly hour commitment
  - additional_comments (text, optional) - Additional information
  
  ### 2. recruitment_summary
  Admin analytics table for tracking recruitment metrics
  
  ## Indexes
  - bits_id - Fast duplicate checking
  - email_id - Fast duplicate checking
  - created_at (DESC) - Chronological sorting
  - hours_commitment - Filtering by commitment level
  - portfolio_status - Filtering by portfolio status
  - Composite index on technical ratings for skill-based filtering
  
  ## Security
  - RLS enabled on both tables
  - Public can insert new responses (for form submissions)
  - Only authenticated admins can read all responses
  - Authenticated users can update recruitment_summary
*/

-- Create main recruitment responses table
CREATE TABLE IF NOT EXISTS ai_advisor_recruitment_responses (
  -- System fields
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  
  -- Section 1: Basic Information
  full_name varchar(255) NOT NULL,
  bits_id varchar(50) NOT NULL UNIQUE,
  email_id varchar(255) NOT NULL UNIQUE,
  whatsapp_number varchar(20) NOT NULL,
  
  -- Section 2: Understanding the Task
  understanding_portfolio_analyzer text NOT NULL,
  understanding_recommendation_engine text NOT NULL,
  expected_recommendations text NOT NULL,
  portfolio_analysis_requirements text NOT NULL,
  first_milestone_idea text NOT NULL,
  rating_portfolio_management integer NOT NULL CHECK (rating_portfolio_management >= 1 AND rating_portfolio_management <= 5),
  rating_financial_markets integer NOT NULL CHECK (rating_financial_markets >= 1 AND rating_financial_markets <= 5),
  rating_python_programming integer NOT NULL CHECK (rating_python_programming >= 1 AND rating_python_programming <= 5),
  rating_data_analysis integer NOT NULL CHECK (rating_data_analysis >= 1 AND rating_data_analysis <= 5),
  rating_ml_ai_basics integer NOT NULL CHECK (rating_ml_ai_basics >= 1 AND rating_ml_ai_basics <= 5),
  financial_data_experience text,
  
  -- Section 3: Interest & Motivation
  motivation text NOT NULL,
  portfolio_status varchar(50) NOT NULL CHECK (
    portfolio_status IN (
      'Yes, actively manage my own portfolio',
      'Yes, but not actively',
      'No, but interested in learning',
      'No'
    )
  ),
  portfolio_description text,
  innovative_idea text NOT NULL,
  
  -- Section 4: Commitment
  hours_commitment varchar(20) NOT NULL CHECK (
    hours_commitment IN (
      '2-4 hours',
      '5-7 hours',
      '8-10 hours',
      '10+ hours'
    )
  ),
  additional_comments text
);

-- Create recruitment summary table for admin analytics
CREATE TABLE IF NOT EXISTS recruitment_summary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_responses integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  avg_technical_rating numeric(3,2),
  commitment_distribution jsonb,
  portfolio_status_distribution jsonb
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bits_id ON ai_advisor_recruitment_responses(bits_id);
CREATE INDEX IF NOT EXISTS idx_email_id ON ai_advisor_recruitment_responses(email_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON ai_advisor_recruitment_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hours_commitment ON ai_advisor_recruitment_responses(hours_commitment);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON ai_advisor_recruitment_responses(portfolio_status);
CREATE INDEX IF NOT EXISTS idx_technical_ratings ON ai_advisor_recruitment_responses(
  rating_python_programming,
  rating_data_analysis,
  rating_ml_ai_basics
);

-- Create trigger function for auto-updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on recruitment responses
DROP TRIGGER IF EXISTS update_recruitment_responses_updated_at ON ai_advisor_recruitment_responses;
CREATE TRIGGER update_recruitment_responses_updated_at
  BEFORE UPDATE ON ai_advisor_recruitment_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE ai_advisor_recruitment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_summary ENABLE ROW LEVEL SECURITY;

-- RLS Policies for recruitment responses
CREATE POLICY "Anyone can submit recruitment responses"
  ON ai_advisor_recruitment_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all responses"
  ON ai_advisor_recruitment_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for recruitment summary
CREATE POLICY "Authenticated users can view recruitment summary"
  ON recruitment_summary
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update recruitment summary"
  ON recruitment_summary
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert recruitment summary"
  ON recruitment_summary
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
