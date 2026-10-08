### AI Interviewer Assistant Overview
AI Interviewer Assitant is an AI Assistant that will simulate a real interviewer during a technical leetcode-style interview. The AI will guide and respond question by providing things like hints and asking the user to explain their thought process. Helping users practice for their technical interviews.

### Target User
Aimed for students/people who are looking to prepare for technical software engineering interviews.

### Functional Requirements
- Submit code (securely) and pass tests
- AI chat to ask the LLM questions during the interview
- Provide both audio and text inputs for the LLM
- Save interview chats after interview is done
- Input user on leetcode question (by providing a link) to start simulating interview
- Sign/Log in users 

### Data Model
- User
    - user_id
    - first_name
    - middle_name
    - last_name
    - user_name
    - email
    - profile_pic
    - created_at
    - updated_at
- Problem
    - problem_id
    - name
    - description
    - tests_id
    - created_at
    - updated_at
- Interview
    - interview_id
    - problem_id (Problem can have multiple interviews)
    - user_id (User can have multiple interviews)
    - time_length
    - created_at
- Messages
    - message_id
    - user_id
    - interview_id
    - message_text
    - source (ai, user)
- TestsCases
- Submissions
    - user_id
    - problem_id
    - text_code
    - submitted_at
    - status (failed, pass)


### API Design

### Tech Stack