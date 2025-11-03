import { Target, AlertCircle } from 'lucide-react';

export default function MatchScore({ results }) {
  if (!results) return null;

  // Calculate match score based on reasoning
  const calculateMatchScore = () => {
    const reasoning = results.reasoning.toLowerCase();
    
    // Scoring factors
    let score = 50; // Base score
    
    // Positive indicators
    if (reasoning.includes('perfect') || reasoning.includes('ideal')) score += 20;
    if (reasoning.includes('strong') || reasoning.includes('excellent')) score += 15;
    if (reasoning.includes('align')) score += 10;
    if (reasoning.includes('match')) score += 10;
    if (reasoning.includes('experience')) score += 5;
    
    // Negative indicators
    if (reasoning.includes('limited') || reasoning.includes('some')) score -= 10;
    if (reasoning.includes('partial')) score -= 15;
    
    return Math.min(100, Math.max(0, score));
  };

  const matchScore = calculateMatchScore();
  
  const getScoreColor = (score) => {
    if (score >= 85) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', label: 'Excellent Match' };
    if (score >= 70) return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', label: 'Good Match' };
    if (score >= 50) return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Fair Match' };
    return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'Partial Match' };
  };

  const scoreStyle = getScoreColor(matchScore);

  return (
    <div className={`${scoreStyle.bg} border ${scoreStyle.border} rounded-lg p-5 mb-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className={`w-5 h-5 ${scoreStyle.text}`} />
          <h3 className={`font-semibold ${scoreStyle.text}`}>Resume Match Score</h3>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${scoreStyle.text}`}>{matchScore}%</div>
          <div className={`text-xs font-medium ${scoreStyle.text} opacity-75`}>{scoreStyle.label}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-current border-opacity-20 mb-4">
        <div
          className={`h-full transition-all duration-500 ${
            matchScore >= 85
              ? 'bg-gradient-to-r from-green-400 to-green-500'
              : matchScore >= 70
              ? 'bg-gradient-to-r from-blue-400 to-blue-500'
              : matchScore >= 50
              ? 'bg-gradient-to-r from-amber-400 to-amber-500'
              : 'bg-gradient-to-r from-orange-400 to-orange-500'
          }`}
          style={{ width: `${matchScore}%` }}
        />
      </div>

      {/* Insights */}
      <div className="space-y-2">
        <div className="flex gap-2 text-sm">
          <AlertCircle className={`w-4 h-4 ${scoreStyle.text} flex-shrink-0 mt-0.5`} />
          <div>
            {matchScore >= 85 && (
              <p className={scoreStyle.text}>
                <span className="font-semibold">Excellent fit!</span> This resume strongly aligns with the job requirements. Prioritize this application.
              </p>
            )}
            {matchScore >= 70 && matchScore < 85 && (
              <p className={scoreStyle.text}>
                <span className="font-semibold">Good match.</span> Your resume covers the key requirements. Consider highlighting your most relevant achievements.
              </p>
            )}
            {matchScore >= 50 && matchScore < 70 && (
              <p className={scoreStyle.text}>
                <span className="font-semibold">Fair match.</span> Some skills align well. Emphasize transferable experience and relevant projects.
              </p>
            )}
            {matchScore < 50 && (
              <p className={scoreStyle.text}>
                <span className="font-semibold">Partial match.</span> Consider if you meet the core requirements before applying. You may want to focus on other opportunities.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
