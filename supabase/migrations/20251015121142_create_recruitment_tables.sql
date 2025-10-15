/*
  # SOFI Recruitment System Database Schema
  
  1. New Tables
    - `recruitment_responses`
      - Stores all applicant responses to the recruitment questionnaire
      - Contains sections: Basic Info, Understanding, Execution, Interest
      - All fields map directly to form questions
      
    - `recruitment_summary`
      - Stores aggregated statistics and insights
      - Used for admin dashboard visualizations
  
  2. Security
    - Enable RLS on both tables
    - Public can INSERT into recruitment_responses (form submissions)
    - Only authenticated admin (admin@sofi) can SELECT, UPDATE, DELETE
*/

-- Create recruitment_responses table
CREATE TABLE IF NOT EXISTS recruitment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Section 1: Basic Info
  full_name text NOT NULL,
  bits_id text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  whatsapp_number text NOT NULL,
  
  -- Section 2: Understanding
  understanding_advisor text NOT NULL,
  analysis_vs_recommendation text NOT NULL,
  core_features_suggestion text NOT NULL,
  weekly_summary_format text NOT NULL,
  portfolio_management_rating integer NOT NULL CHECK (portfolio_management_rating BETWEEN 1 AND 5),
  financial_markets_rating integer NOT NULL CHECK (financial_markets_rating BETWEEN 1 AND 5),
  python_rating integer NOT NULL CHECK (python_rating BETWEEN 1 AND 5),
  data_analysis_rating integer NOT NULL CHECK (data_analysis_rating BETWEEN 1 AND 5),
  ml_ai_rating integer NOT NULL CHECK (ml_ai_rating BETWEEN 1 AND 5),
  api_rating integer NOT NULL CHECK (api_rating BETWEEN 1 AND 5),
  financial_data_experience text NOT NULL,
  github_portfolio_link text,
  
  -- Section 3: Execution
  build_approach_steps text NOT NULL,
  two_week_prototype text NOT NULL,
  llm_understanding text NOT NULL,
  ai_risks_limitations text NOT NULL,
  portfolio_data_needed text NOT NULL,
  testing_recommendations text NOT NULL,
  
  -- Section 4: Interest
  why_work_on_product text NOT NULL,
  manages_portfolio text NOT NULL CHECK (manages_portfolio IN ('Yes, actively manage my own portfolio', 'Yes, but not actively', 'No, but interested in learning', 'No')),
  portfolio_description text,
  hours_per_week text NOT NULL CHECK (hours_per_week IN ('2-4 hours', '5-7 hours', '8-10 hours', '10+ hours')),
  additional_comments text
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_email ON recruitment_responses(email);
CREATE INDEX IF NOT EXISTS idx_created_at ON recruitment_responses(created_at DESC);

-- Create recruitment_summary table for dashboard analytics
CREATE TABLE IF NOT EXISTS recruitment_summary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_responses integer DEFAULT 0,
  avg_portfolio_rating numeric DEFAULT 0,
  avg_python_rating numeric DEFAULT 0,
  avg_ml_rating numeric DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE recruitment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_summary ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public form submission)
CREATE POLICY "Public can submit applications"
  ON recruitment_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only admin@sofi can view responses
CREATE POLICY "Admin can view all responses"
  ON recruitment_responses
  FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@sofi');

-- Policy: Only admin@sofi can update/delete
CREATE POLICY "Admin can update responses"
  ON recruitment_responses
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@sofi')
  WITH CHECK (auth.email() = 'admin@sofi');

CREATE POLICY "Admin can delete responses"
  ON recruitment_responses
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'admin@sofi');

-- Summary table policies
CREATE POLICY "Admin can view summary"
  ON recruitment_summary
  FOR SELECT
  TO authenticated
  USING (auth.email() = 'admin@sofi');

CREATE POLICY "Admin can update summary"
  ON recruitment_summary
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@sofi')
  WITH CHECK (auth.email() = 'admin@sofi');

-- Initialize summary row
INSERT INTO recruitment_summary (id) VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;
