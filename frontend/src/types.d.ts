interface Post {
  id: number;
  title: string;
  content: string;
  type: "announcement" | "placement" | "internship" | "hackathon";
  tags?: string | null;
  created_at: string;
  updated_at: string;
}
