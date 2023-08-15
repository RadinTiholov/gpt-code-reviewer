namespace GPTCodeReviewer.Web.GPT.Queries
{
    public class GPTQueries
    {
        public static string ReviewCodeQuery(string factors)
        {
            return $"Please conduct a comprehensive analysis of this code, including bug identification, opportunities for refactoring, and overall code quality assessment. For each aspect, provide detailed feedback with suggestions for improvement and the rationale behind the assigned score. The score should be between 0 and 10.0. Additionally, determine the programming language used. Return only JSON! I want your answer as JSON in this format: {{ \"language\" : \"your opinion\", \"overallScore\" : \"your score\", \"overallScoreMessage\" : \"your opinion\", {factors} }}";
        }
    }
}
