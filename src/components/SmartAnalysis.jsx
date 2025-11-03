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
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary-600">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Smart Job Analysis</h3>
      </div>

      {/* Analysis Badges - Responsive Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Seniority Level */}
        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
          <div className="text-xs font-medium text-purple-600 mb-1">Seniority</div>
          <div className="text-sm font-bold text-purple-700 capitalize">{analysis.seniority}</div>
        </div>

        {/* Years Required */}
        {analysis.yearsRequired && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <div className="text-xs font-medium text-amber-600 mb-1">Experience</div>
            <div className="text-sm font-bold text-amber-700">{analysis.yearsRequired}+ years</div>
          </div>
        )}

        {/* Job Type */}
        <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200">
          <div className="text-xs font-medium text-cyan-600 mb-1">Work Type</div>
          <div className="text-sm font-bold text-cyan-700 capitalize">{analysis.jobType}</div>
        </div>

        {/* Complexity */}
        <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
          <div className="text-xs font-medium text-indigo-600 mb-1">Complexity</div>
          <div className="text-sm font-bold text-indigo-700">{getComplexityLabel(analysis.complexity)}</div>
        </div>
      </div>

      {/* Top Skills */}
      {analysis.skills.length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Key Skills Detected
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Smart Insights */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <div className="flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-800 leading-relaxed">
            <span className="font-bold text-emerald-700">Smart Tip:</span> This is a{' '}
            <span className="font-bold text-gray-900">{analysis.seniority}-level</span> position requiring{' '}
            <span className="font-bold text-gray-900">{analysis.yearsRequired ? `${analysis.yearsRequired}+ years` : 'varied'}</span>{' '}
            of experience. Focus on relevant achievements and quantifiable results.
          </div>
        </div>
      </div>
    </div>
  );
}
