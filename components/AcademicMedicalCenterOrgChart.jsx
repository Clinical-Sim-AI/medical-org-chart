"use client";

import { useState, useCallback, useMemo } from "react";
import { ChevronDown, ChevronRight, Users, GraduationCap, Stethoscope, Building2, Heart, ClipboardList, BookOpen, Shield, TrendingUp } from "lucide-react";

// Color palette for different organizational domains
const COLORS = {
  executive: { bg: "#1e293b", text: "#ffffff", border: "#334155" },
  academic: { bg: "#7c3aed", text: "#ffffff", border: "#6d28d9" },
  clinical: { bg: "#0891b2", text: "#ffffff", border: "#0e7490" },
  gme: { bg: "#059669", text: "#ffffff", border: "#047857" },
  nursing: { bg: "#d97706", text: "#ffffff", border: "#b45309" },
  department: { bg: "#4f46e5", text: "#ffffff", border: "#4338ca" },
  program: { bg: "#2563eb", text: "#ffffff", border: "#1d4ed8" },
  support: { bg: "#64748b", text: "#ffffff", border: "#475569" },
  student: { bg: "#be185d", text: "#ffffff", border: "#9d174d" },
  research: { bg: "#7c3aed", text: "#ffffff", border: "#6d28d9" },
};

const orgData = {
  id: "board",
  title: "Board of Trustees / Regents",
  subtitle: "Governance & fiduciary oversight",
  color: "executive",
  children: [
    {
      id: "ceo",
      title: "President / CEO",
      subtitle: "Health System",
      color: "executive",
      children: [
        {
          id: "cmo",
          title: "Chief Medical Officer (CMO)",
          subtitle: "Clinical quality, patient safety, physician affairs",
          color: "clinical",
          children: [
            {
              id: "med-staff",
              title: "Medical Staff Office",
              subtitle: "Credentialing, privileging, peer review",
              color: "support",
              children: [],
            },
            {
              id: "quality",
              title: "VP, Quality & Patient Safety",
              subtitle: "CMS compliance, accreditation readiness",
              color: "clinical",
              children: [
                { id: "qi", title: "Quality Improvement Teams", subtitle: "Lean/Six Sigma, PDSA cycles", color: "support", children: [] },
                { id: "infection", title: "Infection Prevention", subtitle: "Surveillance, outbreak response", color: "support", children: [] },
              ],
            },
          ],
        },
        {
          id: "coo",
          title: "Chief Operating Officer (COO)",
          subtitle: "Day-to-day hospital operations",
          color: "executive",
          children: [
            {
              id: "periop",
              title: "VP, Perioperative Services",
              subtitle: "OR scheduling, sterile processing, PACU",
              color: "clinical",
              children: [],
            },
            {
              id: "ancillary",
              title: "VP, Ancillary Services",
              subtitle: "Lab, pharmacy, radiology, respiratory therapy",
              color: "clinical",
              children: [],
            },
            {
              id: "facilities",
              title: "VP, Facilities & Support",
              subtitle: "Plant ops, EVS, food services, security",
              color: "support",
              children: [],
            },
            {
              id: "it",
              title: "Chief Information Officer (CIO)",
              subtitle: "EHR (Epic/Cerner), health informatics, cybersecurity",
              color: "support",
              children: [],
            },
          ],
        },
        {
          id: "cfo",
          title: "Chief Financial Officer (CFO)",
          subtitle: "Revenue cycle, budgets, managed care contracting",
          color: "executive",
          children: [
            { id: "revenue", title: "Revenue Cycle Management", subtitle: "Coding, billing, collections, denials", color: "support", children: [] },
            { id: "finance", title: "Financial Planning & Analysis", subtitle: "Budgeting, forecasting, capital planning", color: "support", children: [] },
          ],
        },
        {
          id: "cro",
          title: "Chief Revenue Officer (CRO)",
          subtitle: "Payer strategy, service line growth, physician enterprise",
          color: "executive",
          children: [
            { id: "managed-care", title: "VP, Managed Care & Payer Strategy", subtitle: "Contract negotiation, rate modeling, payer mix optimization", color: "support", children: [] },
            { id: "service-lines", title: "Service Line Administrators", subtitle: "Heart & vascular, oncology, neuro, ortho (P&L ownership)", color: "clinical", children: [] },
            { id: "physician-enterprise", title: "VP, Physician Enterprise / Faculty Practice Plan", subtitle: "Employed physician network, clinic ops, wRVU targets, comp plans", color: "clinical", children: [] },
            { id: "business-dev", title: "Business Development & Strategic Planning", subtitle: "Market analysis, new program launches, outreach site expansion", color: "support", children: [] },
            { id: "transfer-center", title: "Transfer Center / Patient Access", subtitle: "Referral capture, bed placement, capacity management", color: "support", children: [] },
          ],
        },
        {
          id: "cno",
          title: "Chief Nursing Officer (CNO)",
          subtitle: "All nursing practice, Magnet designation, staffing",
          color: "nursing",
          children: [
            {
              id: "nurse-dir-med",
              title: "Director of Nursing, Medical Units",
              subtitle: "Med-surg, telemetry, oncology, neuro floors",
              color: "nursing",
              children: [
                {
                  id: "nurse-mgr",
                  title: "Nurse Managers (unit-level)",
                  subtitle: "Own the unit: staffing, budgets, patient flow",
                  color: "nursing",
                  children: [
                    {
                      id: "charge-nurse",
                      title: "Charge Nurses",
                      subtitle: "Shift-level leadership, bed assignments",
                      color: "nursing",
                      children: [
                        { id: "rn-staff", title: "Staff RNs", subtitle: "Direct bedside patient care", color: "nursing", children: [] },
                        { id: "lpn", title: "LPNs / LVNs", subtitle: "Medication administration, wound care (scope varies by state)", color: "nursing", children: [] },
                        { id: "cna-tech", title: "CNAs / Patient Care Techs", subtitle: "Vitals, ADLs, ambulation, safety checks", color: "nursing", children: [] },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: "nurse-dir-critical",
              title: "Director of Nursing, Critical Care",
              subtitle: "ICU, CVICU, neuro ICU, burn unit",
              color: "nursing",
              children: [
                {
                  id: "icu-mgrs",
                  title: "ICU Nurse Managers",
                  subtitle: "High-acuity staffing ratios, vent protocols",
                  color: "nursing",
                  children: [],
                },
              ],
            },
            {
              id: "nurse-dir-surgical",
              title: "Director of Nursing, Surgical Services",
              subtitle: "OR nurses, PACU, pre-op/post-op",
              color: "nursing",
              children: [],
            },
            {
              id: "nurse-ed",
              title: "Director of Nursing Education",
              subtitle: "Onboarding, competencies, nurse residency programs",
              color: "nursing",
              children: [
                { id: "nurse-educators", title: "Clinical Nurse Educators", subtitle: "Unit-based training, skills labs, EBP projects", color: "nursing", children: [] },
                { id: "nurse-residents", title: "Nurse Residents (new grad RNs)", subtitle: "12-month transition-to-practice program", color: "nursing", children: [] },
              ],
            },
            {
              id: "apn-dir",
              title: "Director of Advanced Practice",
              subtitle: "NPs, CRNAs, CNMs, CNSs",
              color: "nursing",
              children: [
                { id: "nps", title: "Nurse Practitioners (NPs)", subtitle: "Diagnose, prescribe, manage panels (varies by state autonomy)", color: "nursing", children: [] },
                { id: "crnas", title: "CRNAs", subtitle: "Anesthesia delivery in OR and procedural areas", color: "nursing", children: [] },
                { id: "pas", title: "Physician Assistants (PAs)", subtitle: "Often report here or under department chairs", color: "nursing", children: [] },
              ],
            },
          ],
        },
        {
          id: "dean",
          title: "Dean, School of Medicine",
          subtitle: "Academic mission: education, research, faculty affairs",
          color: "academic",
          children: [
            {
              id: "ume",
              title: "Associate Dean, Undergraduate Medical Education (UME)",
              subtitle: "MD/DO curriculum, LCME accreditation",
              color: "student",
              children: [
                {
                  id: "preclinical",
                  title: "Director of Preclinical Education",
                  subtitle: "Years 1-2: anatomy, physiology, pathology, pharm",
                  color: "student",
                  children: [
                    { id: "ms1", title: "MS1 Students", subtitle: "Year 1: foundational sciences, early clinical exposure", color: "student", children: [] },
                    { id: "ms2", title: "MS2 Students", subtitle: "Year 2: organ systems, Step 1 prep, clinical skills", color: "student", children: [] },
                  ],
                },
                {
                  id: "clinical-ed",
                  title: "Director of Clinical Education",
                  subtitle: "Years 3-4: clerkships and electives",
                  color: "student",
                  children: [
                    {
                      id: "clerkship-dirs",
                      title: "Clerkship Directors",
                      subtitle: "One per core rotation (IM, surgery, peds, OB/GYN, psych, FM)",
                      color: "student",
                      children: [
                        { id: "ms3", title: "MS3 Students (core clerkships)", subtitle: "Rotating through required clinical disciplines", color: "student", children: [] },
                        { id: "ms4", title: "MS4 Students (sub-Is & electives)", subtitle: "Audition rotations, research, residency applications", color: "student", children: [] },
                      ],
                    },
                  ],
                },
                {
                  id: "ume-coordinator",
                  title: "UME Program Coordinators",
                  subtitle: "Scheduling, evaluations, compliance tracking, student support",
                  color: "support",
                  children: [],
                },
              ],
            },
            {
              id: "gme",
              title: "Associate Dean for GME / Designated Institutional Official (DIO)",
              subtitle: "ACGME institutional accreditation, all residency & fellowship programs",
              color: "gme",
              children: [
                {
                  id: "gme-office",
                  title: "GME Office",
                  subtitle: "Central administration for all training programs",
                  color: "gme",
                  children: [
                    { id: "gme-admin", title: "GME Program Manager", subtitle: "Budgets, contracts, institutional reporting, ACGME site visits", color: "support", children: [] },
                    { id: "gme-compliance", title: "GME Compliance & Data Analyst", subtitle: "Duty hours monitoring, milestone tracking, case log audits", color: "support", children: [] },
                    { id: "gmec", title: "Graduate Medical Education Committee (GMEC)", subtitle: "Institutional oversight body (DIO chairs, PDs sit on it)", color: "gme", children: [] },
                  ],
                },
                {
                  id: "im-residency",
                  title: "Internal Medicine",
                  subtitle: "Typically the largest department with multiple fellowships",
                  color: "department",
                  isGroup: true,
                  children: [
                    {
                      id: "im-pd",
                      title: "Program Director, IM Residency",
                      subtitle: "ACGME program oversight, CCC, PEC, recruitment",
                      color: "program",
                      children: [
                        {
                          id: "im-apds",
                          title: "Associate Program Directors (2-4)",
                          subtitle: "Curriculum, wellness, simulation, research tracks",
                          color: "program",
                          children: [],
                        },
                        {
                          id: "im-chiefs",
                          title: "Chief Residents (2-4)",
                          subtitle: "Schedule, conferences, peer mentorship (PGY-4 year)",
                          color: "program",
                          children: [],
                        },
                        {
                          id: "im-coordinator",
                          title: "Residency Program Coordinator(s)",
                          subtitle: "ERAS, onboarding, evaluations, duty hours, visa processing",
                          color: "support",
                          children: [],
                        },
                        {
                          id: "im-residents",
                          title: "IM Residents (PGY-1 through PGY-3)",
                          subtitle: "~30-45 per class at a large AMC. Inpatient wards, ICU, clinics",
                          color: "gme",
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "im-fellowships",
                      title: "IM Subspecialty Fellowships",
                      subtitle: "Each has its own PD, coordinator, and fellows",
                      color: "program",
                      children: [
                        { id: "cards-fellow", title: "Cardiology Fellowship (PD + Coordinator + Fellows)", subtitle: "3 yr general + optional interventional/EP/HF year", color: "program", children: [] },
                        { id: "gi-fellow", title: "GI / Hepatology Fellowship", subtitle: "3 years, heavy procedural volume", color: "program", children: [] },
                        { id: "pulm-fellow", title: "Pulm/Critical Care Fellowship", subtitle: "3 years, combined pulmonary + ICU training", color: "program", children: [] },
                        { id: "heme-fellow", title: "Hematology/Oncology Fellowship", subtitle: "3 years, often joint with cancer center", color: "program", children: [] },
                        { id: "endo-fellow", title: "Endocrinology Fellowship", subtitle: "2 years", color: "program", children: [] },
                        { id: "neph-fellow", title: "Nephrology Fellowship", subtitle: "2 years", color: "program", children: [] },
                        { id: "rheum-fellow", title: "Rheumatology Fellowship", subtitle: "2 years", color: "program", children: [] },
                        { id: "id-fellow", title: "Infectious Disease Fellowship", subtitle: "2 years", color: "program", children: [] },
                      ],
                    },
                  ],
                },
                {
                  id: "surgery-dept",
                  title: "Surgery",
                  subtitle: "Distinct culture: pyramidal structure, longer training",
                  color: "department",
                  isGroup: true,
                  children: [
                    {
                      id: "gs-pd",
                      title: "Program Director, General Surgery Residency",
                      subtitle: "5-year categorical program, ACGME case minimums",
                      color: "program",
                      children: [
                        { id: "gs-coordinator", title: "Surgery Program Coordinator", subtitle: "Case logs, call schedules, ACGME reporting", color: "support", children: [] },
                        { id: "gs-residents", title: "General Surgery Residents (PGY-1 to PGY-5)", subtitle: "~5-8 per class, progressive responsibility model", color: "gme", children: [] },
                      ],
                    },
                    {
                      id: "surg-subspecialties",
                      title: "Surgical Subspecialty Fellowships",
                      subtitle: "Each with its own PD and coordinator",
                      color: "program",
                      children: [
                        { id: "ct-surg", title: "Cardiothoracic Surgery", subtitle: "2-3 year fellowship (integrated pathway also exists)", color: "program", children: [] },
                        { id: "vasc-surg", title: "Vascular Surgery", subtitle: "2 years (or 5-year integrated)", color: "program", children: [] },
                        { id: "trauma-surg", title: "Surgical Critical Care / Trauma", subtitle: "1-2 year fellowship", color: "program", children: [] },
                        { id: "transplant", title: "Transplant Surgery", subtitle: "2 year fellowship", color: "program", children: [] },
                        { id: "ped-surg", title: "Pediatric Surgery", subtitle: "2 year fellowship", color: "program", children: [] },
                      ],
                    },
                  ],
                },
                {
                  id: "other-depts",
                  title: "Other Major Departments & Programs",
                  subtitle: "Each structured similarly: Chair → PD → APDs → Coordinator → Trainees",
                  color: "department",
                  isGroup: true,
                  children: [
                    { id: "em", title: "Emergency Medicine (3-4 yr residency)", subtitle: "High volume, shift-based, toxicology/ultrasound fellowships", color: "program", children: [] },
                    { id: "anesthesia", title: "Anesthesiology (4 yr: CA-1 to CA-3 + intern yr)", subtitle: "Fellowships: cardiac, regional, neuro, pain, peds", color: "program", children: [] },
                    { id: "peds-dept", title: "Pediatrics (3 yr residency)", subtitle: "Fellowships: neonatology, PICU, cardiology, GI, endo, etc.", color: "program", children: [] },
                    { id: "obgyn", title: "OB/GYN (4 yr residency)", subtitle: "Fellowships: MFM, REI, gyn-onc, urogyn", color: "program", children: [] },
                    { id: "psych", title: "Psychiatry (4 yr residency)", subtitle: "Fellowships: child/adolescent, addiction, C-L, forensic", color: "program", children: [] },
                    { id: "radiology", title: "Radiology (5 yr: 1 intern + 4 diagnostic)", subtitle: "Fellowships: IR, neurorad, MSK, body, breast", color: "program", children: [] },
                    { id: "path", title: "Pathology (4 yr: AP/CP combined)", subtitle: "Fellowships: surgical path, cytology, heme, forensic", color: "program", children: [] },
                    { id: "neuro", title: "Neurology (4 yr residency)", subtitle: "Fellowships: stroke, epilepsy, movement disorders, neuromuscular", color: "program", children: [] },
                    { id: "ortho", title: "Orthopedic Surgery (5 yr residency)", subtitle: "Fellowships: sports, spine, hand, trauma, joints", color: "program", children: [] },
                    { id: "uro", title: "Urology (6 yr integrated)", subtitle: "Fellowships: uro-onc, female pelvic, endourology", color: "program", children: [] },
                    { id: "derm", title: "Dermatology (4 yr: 1 intern + 3)", subtitle: "Small programs, dermatopathology fellowship", color: "program", children: [] },
                    { id: "ent", title: "Otolaryngology / ENT (5 yr residency)", subtitle: "Fellowships: head & neck onc, pediatric, rhinology", color: "program", children: [] },
                    { id: "fm", title: "Family Medicine (3 yr residency)", subtitle: "Sports medicine, hospice, geriatrics fellowships", color: "program", children: [] },
                    { id: "pm-r", title: "PM&R / Physical Medicine (4 yr residency)", subtitle: "Fellowships: pain, SCI, brain injury, sports", color: "program", children: [] },
                    { id: "radonc", title: "Radiation Oncology (5 yr integrated)", subtitle: "Small programs, physics track available", color: "program", children: [] },
                  ],
                },
              ],
            },
            {
              id: "research-dean",
              title: "Associate Dean for Research",
              subtitle: "NIH funding portfolio, IRB, core labs, research administration",
              color: "research",
              children: [
                { id: "irb", title: "Institutional Review Board (IRB)", subtitle: "Human subjects protections, protocol review", color: "support", children: [] },
                { id: "research-admin", title: "Office of Sponsored Programs", subtitle: "Grant submissions, budgets, compliance, post-award", color: "support", children: [] },
                { id: "core-labs", title: "Core Research Laboratories", subtitle: "Genomics, proteomics, biostatistics, animal facility", color: "research", children: [] },
              ],
            },
            {
              id: "faculty-dean",
              title: "Associate Dean for Faculty Affairs",
              subtitle: "Appointments, promotions, tenure, faculty development",
              color: "academic",
              children: [
                { id: "faculty-dev", title: "Office of Faculty Development", subtitle: "Teaching awards, mentoring programs, leadership tracks", color: "academic", children: [] },
              ],
            },
            {
              id: "dept-chairs",
              title: "Department Chairs",
              subtitle: "Each chair runs their clinical & academic department",
              color: "department",
              children: [
                {
                  id: "chair-structure",
                  title: "Typical Chair Structure (per department)",
                  subtitle: "Clinical operations + education + research arms",
                  color: "department",
                  children: [
                    { id: "vice-chair-clin", title: "Vice Chair, Clinical Operations", subtitle: "RVU targets, clinic throughput, OR block time", color: "clinical", children: [] },
                    { id: "vice-chair-ed", title: "Vice Chair, Education", subtitle: "Oversees PD, clerkship director, simulation", color: "academic", children: [] },
                    { id: "vice-chair-res", title: "Vice Chair, Research", subtitle: "Lab space allocation, grant strategy, T32 training grants", color: "research", children: [] },
                    { id: "division-chiefs", title: "Division Chiefs (for large departments)", subtitle: "e.g., IM has chiefs of cardiology, GI, pulm, etc.", color: "department", children: [] },
                    { id: "dept-admin", title: "Department Administrator / Business Manager", subtitle: "HR, finance, space, faculty support, credentialing", color: "support", children: [] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Collapsible tree node component
function OrgNode({ node, depth = 0, expandedNodes, toggleNode }) {
  const isExpanded = expandedNodes.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const colorScheme = COLORS[node.color] || COLORS.support;

  return (
    <div style={{ marginLeft: depth > 0 ? 24 : 0 }}>
      <div
        onClick={() => hasChildren && toggleNode(node.id)}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          padding: "8px 12px",
          marginBottom: 2,
          borderRadius: 8,
          cursor: hasChildren ? "pointer" : "default",
          backgroundColor: isExpanded ? `${colorScheme.bg}11` : "transparent",
          borderLeft: `3px solid ${colorScheme.bg}`,
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          if (hasChildren) e.currentTarget.style.backgroundColor = `${colorScheme.bg}18`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isExpanded ? `${colorScheme.bg}11` : "transparent";
        }}
      >
        <div style={{ marginTop: 2, flexShrink: 0, width: 18 }}>
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={16} color={colorScheme.bg} />
            ) : (
              <ChevronRight size={16} color={colorScheme.bg} />
            )
          ) : (
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: colorScheme.bg, opacity: 0.3 }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: 4,
                backgroundColor: colorScheme.bg,
                color: colorScheme.text,
                fontSize: 13,
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              {node.title}
            </span>
            {hasChildren && (
              <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
                {node.children.length} {node.children.length === 1 ? "report" : "reports"}
              </span>
            )}
          </div>
          {node.subtitle && (
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3, lineHeight: "16px" }}>
              {node.subtitle}
            </div>
          )}
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div style={{ borderLeft: `1px dashed ${colorScheme.bg}40`, marginLeft: 20 }}>
          {node.children.map((child) => (
            <OrgNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Legend component
function Legend() {
  const items = [
    { color: COLORS.executive.bg, label: "Executive Leadership" },
    { color: COLORS.academic.bg, label: "Academic / Faculty Affairs" },
    { color: COLORS.clinical.bg, label: "Clinical Operations" },
    { color: COLORS.gme.bg, label: "GME / Trainees" },
    { color: COLORS.nursing.bg, label: "Nursing & Advanced Practice" },
    { color: COLORS.department.bg, label: "Departments & Divisions" },
    { color: COLORS.program.bg, label: "Training Programs" },
    { color: COLORS.student.bg, label: "Medical Students (UME)" },
    { color: COLORS.research.bg, label: "Research" },
    { color: COLORS.support.bg, label: "Admin / Support Staff" },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", padding: "12px 16px", backgroundColor: "#f8fafc", borderRadius: 8, marginBottom: 16 }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: item.color }} />
          <span style={{ fontSize: 12, color: "#475569" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Collect all node IDs for expand/collapse all
function collectIds(node) {
  let ids = [node.id];
  if (node.children) {
    node.children.forEach((c) => {
      ids = ids.concat(collectIds(c));
    });
  }
  return ids;
}

export default function AcademicMedicalCenterOrgChart() {
  const allIds = useMemo(() => new Set(collectIds(orgData)), []);

  // Start with the top two levels expanded
  const [expandedNodes, setExpandedNodes] = useState(() => {
    const initial = new Set(["board", "ceo"]);
    return initial;
  });

  const toggleNode = useCallback((id) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => setExpandedNodes(new Set(allIds)), [allIds]);
  const collapseAll = useCallback(() => setExpandedNodes(new Set(["board", "ceo"])), []);

  // Expand specific branches
  const expandBranch = useCallback((nodeId) => {
    function findAndExpand(node, target) {
      if (node.id === target) return collectIds(node);
      if (node.children) {
        for (const child of node.children) {
          const result = findAndExpand(child, target);
          if (result) return [node.id, ...result];
        }
      }
      return null;
    }
    const ids = findAndExpand(orgData, nodeId);
    if (ids) {
      setExpandedNodes((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.add(id));
        return next;
      });
    }
  }, []);

  const quickLinks = [
    { label: "Executive Suite", icon: Building2, nodeId: "ceo" },
    { label: "Revenue & Growth", icon: TrendingUp, nodeId: "cro" },
    { label: "Nursing Hierarchy", icon: Heart, nodeId: "cno" },
    { label: "GME & Residencies", icon: Stethoscope, nodeId: "gme" },
    { label: "Medical Students", icon: GraduationCap, nodeId: "ume" },
    { label: "Internal Medicine", icon: ClipboardList, nodeId: "im-residency" },
    { label: "Surgery", icon: Shield, nodeId: "surgery-dept" },
    { label: "Research", icon: BookOpen, nodeId: "research-dean" },
    { label: "All Departments", icon: Users, nodeId: "other-depts" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: "24px 16px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: "28px" }}>
          Academic Medical Center: Organizational Structure
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", margin: "6px 0 0", lineHeight: "20px" }}>
          Interactive org chart for a typical large teaching hospital. Click any node to expand or collapse its reports. Use quick-jump buttons to navigate directly to key areas.
        </p>
      </div>

      {/* Quick jump buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {quickLinks.map(({ label, icon: Icon, nodeId }) => (
          <button
            key={nodeId}
            onClick={() => expandBranch(nodeId)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #e2e8f0",
              backgroundColor: "#fff",
              cursor: "pointer",
              fontSize: 13,
              color: "#334155",
              fontWeight: 500,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Expand/Collapse controls */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          onClick={expandAll}
          style={{
            padding: "5px 12px",
            borderRadius: 6,
            border: "1px solid #e2e8f0",
            backgroundColor: "#fff",
            cursor: "pointer",
            fontSize: 12,
            color: "#64748b",
          }}
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          style={{
            padding: "5px 12px",
            borderRadius: 6,
            border: "1px solid #e2e8f0",
            backgroundColor: "#fff",
            cursor: "pointer",
            fontSize: 12,
            color: "#64748b",
          }}
        >
          Collapse All
        </button>
      </div>

      <Legend />

      {/* The tree */}
      <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "16px 12px" }}>
        <OrgNode
          node={orgData}
          depth={0}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
        />
      </div>

      <div style={{ marginTop: 20, padding: 16, backgroundColor: "#f8fafc", borderRadius: 8, fontSize: 13, color: "#475569", lineHeight: "20px" }}>
        <strong style={{ color: "#1e293b" }}>How to read this chart:</strong> The structure represents a composite of how large academic medical centers (think Duke, UCSF, Hopkins, Michigan) organize themselves. Real institutions vary, but the reporting lines and role layers are consistent. Every residency and fellowship program has its own Program Director, Associate Program Directors, and at least one Program Coordinator handling ACGME compliance, scheduling, evaluations, and trainee support. Department Chairs typically report to both the Dean (academic) and the health system CEO (clinical revenue), creating a matrix structure that is the defining feature of academic medicine.
      </div>
    </div>
  );
}