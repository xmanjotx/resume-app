import { Info, ShieldCheck, Keyboard, Zap, Sparkles } from 'lucide-react';

export default function TipsPanel({ onPick }) {
  const examples = [
    {
      label: 'Cloud Solutions Architect',
      text:
        'We are hiring a Cloud Solutions Architect to design and implement scalable, secure architectures on AWS and GCP. Responsibilities include leading cloud migration projects, optimizing cost, and establishing IaC practices (Terraform/CDK). Required: VPC, IAM, EKS/GKE, API gateways, CI/CD (GitHub Actions), monitoring (CloudWatch/Prometheus), security (CIS, zero trust). Nice to have: FinOps, multi-account strategy, serverless, data pipelines.',
    },
    {
      label: 'Security Architect',
      text:
        'Seeking a Security Architect to define enterprise security patterns across cloud and SaaS. Responsibilities: threat modeling, identity and access strategy, network segmentation, secrets management, vulnerability mgmt, incident response playbooks. Required: AWS security, OIDC/SAML, SIEM (Splunk), KMS/HSM, R2/S3 hardening, RLS, compliance (SOC2/ISO27001).',
    },
    {
      label: 'Platform Engineer',
      text:
        'Looking for a Platform Engineer to build golden paths and improve developer productivity. Responsibilities: maintain Kubernetes platform, GitOps, observability, deploy frameworks, paved roads for microservices. Required: Terraform, ArgoCD, Helm, EKS, service mesh, secrets, scalable logging/metrics/tracing, incident SLOs. Nice: Backstage, IDP experience.',
    },
  ];

  const handlePick = (t) => {
    if (typeof onPick === 'function') onPick(t);
    const el = document.querySelector('textarea');
    if (el) el.focus();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-600">
            <Info className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Tips</h3>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Try an example</span>
        </div>
      </div>

      <ul className="space-y-3.5 text-sm text-gray-700 leading-relaxed">
        <li className="flex gap-3">
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>Paste the full job description including responsibilities, required skills, and nice-to-haves.</span>
        </li>
        <li className="flex gap-3">
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>Add company context (industry, product, team) if available for a sharper match.</span>
        </li>
        <li className="flex gap-3">
          <Keyboard className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
          <span>
            Use <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">Enter</kbd> to submit quickly.
          </span>
        </li>
        <li className="flex gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span>Personal use only. No data stored; PDFs generated locally in your browser.</span>
        </li>
      </ul>

      <div className="mt-6 pt-5 border-t border-gray-200">
        <div className="text-xs font-bold text-gray-700 mb-3">Quick examples</div>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => handlePick(ex.text)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 hover:border-primary-300 transition-colors"
              title={`Insert example: ${ex.label}`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
