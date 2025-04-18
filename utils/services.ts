import {
  Database,
  Server,
  Shield,
  Cpu,
  HardDrive,
  Code,
  Layers,
  ActivityIcon,
  Grid,
  Gauge,
  Lock,
  BarChart,
  Workflow,
  Brain
} from "lucide-react";

export default [
  { id: "openshift-workspaces", Icon: Server, category: "compute" },
  { id: "software-as-a-service", Icon: Code, category: "applications" },
  { id: "s3-object-storage", Icon: HardDrive, category: "storage" },
  { id: "database-as-a-service", Icon: Database, category: "data" },
  { id: "virtual-machines", Icon: Cpu, category: "compute" },
  { id: "backup-as-a-service", Icon: Shield, category: "storage" },
  { id: "paas-application-hosting", Icon: Layers, category: "applications" },
  { id: "openshift-clusters", Icon: Grid, category: "compute" },
  { id: "serverless-functions", Icon: ActivityIcon, category: "compute" },
  { id: "monitoring-services", Icon: Gauge, category: "security" },
  { id: "jboss-as-a-service", Icon: Server, category: "applications" },
  { id: "cluster-security-services", Icon: Lock, category: "security" },
  { id: "big-data-analytics-platforms", Icon: BarChart, category: "data" },
  { id: "automation-platform-as-a-service", Icon: Workflow, category: "applications" },
  { id: "ai-ml-platforms", Icon: Brain, category: "data" }
];
