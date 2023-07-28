namespace GPTCodeReviewer.Web.GPT.Queries
{
    public class GPTQueries
    {
        public const string ReviewCodeQuery = "Please conduct a comprehensive analysis of this code, including bug identification, opportunities for refactoring, and overall code quality assessment. For each aspect, provide detailed feedback with suggestions for improvement and the rationale behind the assigned score. Additionally, determine the programming language used. Return only JSON! I want your answer as JSON in this format: { \"language\" : \"your opinion\", \"overallScore\" : \"your score\", \"overallScoreMessage\" : \"your opinion\", \"bugsScore\" : \"your score\", \"bugsScoreMessage\" : \"your opinion if there are bugs\", \"refactoringScore\" : \"your score\", \"refactoringScoreMessage\" : \"your opinion if refactoring is needed\", \"qualityScore\" : \"your score\", \"qualityScoreMessage\" : \"your oppinion on the quality of the code\", \"overallImprovementMessage\" : \"your message for improvement.\" }";
    }
}
