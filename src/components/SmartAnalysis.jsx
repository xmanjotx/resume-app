import { Brain, TrendingUp, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SmartAnalysis({ jobDescription }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!jobDescription || jobDescription.length < 50) {
      setAnalysis(null);
      return;
    }

    setLoading(true);
    // Simulate analysis delay
    const timer = setTimeout(() => {
      analyzeJobDescription(jobDescription);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [jobDescription]);

  const analyzeJobDescription = (text) => {
    // Extract key metrics
    const yearsMatch = text.match(/(\d+)\+?\s*years?/gi);
    const yearsRequired = yearsMatch ? parseInt(yearsMatch[0]) : null;

    // Extract skills
    const skillPatterns = [
      /(?:skills?|expertise|proficient|experience with)[\s:]+([^.]+)/gi,
      /(?:required|must have)[\s:]+([^.]+)/gi,
    ];
    const skills = new Set();
    skillPatterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const skillText = match[1];
        const skillList = skillText
          .split(/[,;]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 2 && s.length < 50);
        skillList.forEach((skill) => skills.add(skill));
      }
    });

    // Detect seniority level
    const seniorityKeywords = {
      entry: ['junior', 'entry-level', 'entry level', 'graduate', 'fresh'],
      mid: ['mid-level', 'mid level', 'experienced', 'professional'],
      senior: ['senior', 'lead', 'principal', 'staff', 'architect', 'manager'],
      executive: ['director', 'vp', 'c-level', 'cto', 'cfo', 'ceo'],
    };

    let seniority = 'mid';
    for (const [level, keywords] of Object.entries(seniorityKeywords)) {
      if (keywords.some((kw) => text.toLowerCase().includes(kw))) {
        seniority = level;
        break;
      }
    }

    // Detect job type
    const jobTypeKeywords = {
      remote: ['remote', 'work from home', 'distributed', 'anywhere'],
      hybrid: ['hybrid', 'flexible', 'office'],
      onsite: ['on-site', 'on site', 'office-based', 'location'],
    };

    let jobType = 'not specified';
    for (const [type, keywords] of Object.entries(jobTypeKeywords)) {
      if (keywords.some((kw) => text.toLowerCase().includes(kw))) {
        jobType = type;
        break;
      }
    }

    // Calculate complexity score
    const wordCount = text.split(/\s+/).length;
    const requirementCount = (text.match(/(?:required|must|should|nice to have)/gi) || []).length;
    const complexityScore = Math.min(100, Math.round((wordCount / 10 + requirementCount * 5) / 2));

    setAnalysis({
      yearsRequired,
      skills: Array.from(skills).slice(0, 8),
      seniority,
      jobType,
      complexity: complexityScore,
      wordCount,
      requirementCount,
    });
  };

  if (!analysis || loading) {
    return null;
  }

  const getSeniorityColor = (level) => {
    const colors = {
      entry: 'bg-green-50 border-green-200 text-green-700',
      mid: 'bg-blue-50 border-blue-200 text-blue-700',
      senior: 'bg-purple-50 border-purple-200 text-purple-700',
      executive: 'bg-red-50 border-red-200 text-red-700',
    };
    return colors[level] || colors.mid;
  };

  const getComplexityLabel = (score) => {
    if (score < 30) return 'Simple';
    if (score < 60) return 'Moderate';
    if (score < 80) return 'Complex';
    return 'Very Complex';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-blue-600" />
        <h3 className="text-sm font-semibold text-slate-900">Smart Job Analysis</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* Seniority Level */}
        <div className={`p-3 rounded-lg border ${getSeniorityColor(analysis.seniority)}`}>
          <div className="text-xs font-medium opacity-75">Seniority</div>
          <div className="text-sm font-semibold capitalize">{analysis.seniority}</div>
        </div>

        {/* Years Required */}
        {analysis.yearsRequired && (
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
            <div className="text-xs font-medium opacity-75">Experience</div>
            <div className="text-sm font-semibold">{analysis.yearsRequired}+ years</div>
          </div>
        )}

        {/* Job Type */}
        <div className="p-3 rounded-lg bg-cyan-50/70 border border-cyan-200 text-cyan-700">
          <div className="text-xs font-medium opacity-75">Work Type</div>
          <div className="text-sm font-semibold capitalize">{analysis.jobType}</div>
        </div>

        {/* Complexity */}
        <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700">
          <div className="text-xs font-medium opacity-75">Complexity</div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{getComplexityLabel(analysis.complexity)}</span>
          </div>
        </div>
      </div>

      {/* Top Skills */}
      {analysis.skills.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
            <Zap className="w-4 h-4" />
            Key Skills Detected
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-blue-200 hover:bg-blue-50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Smart Insights */}
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex gap-2 text-sm text-slate-700">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-medium">Smart Tip:</span> This is a{' '}
            <span className="font-semibold">{analysis.seniority}-level</span> position requiring{' '}
            <span className="font-semibold">{analysis.yearsRequired ? `${analysis.yearsRequired}+ years` : 'varied'}</span>{' '}
            of experience. Focus on relevant achievements and quantifiable results.
          </div>
        </div>
      </div>
    </div>
  );
}
