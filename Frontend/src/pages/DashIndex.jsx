import { AppSidebar } from "@/components2/AppSidebar";
import { DashboardHeader } from "@/components2/DashboardHeader";
import { CircularProgress } from "@/components2/CircularProgress";
import { AssessmentCard } from "@/components2/AssessmentCard";
import { ProgressChart } from "@/components2/ProgressChart";
import { GoalItem } from "@/components2/GoalItem";
import { StatCard } from "@/components2/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components2/ui/card";
import { Progress } from "@/components2/ui/progress";
import { Calendar, Target, ClipboardCheck, Smile } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <DashboardHeader />
        
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Row - 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Mental Health Level */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Mental Health Level</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <CircularProgress value={75} />
                  <p className="mt-4 text-lg font-medium text-foreground">Good</p>
                  <p className="text-sm text-muted-foreground">Based on recent assessments</p>
                </CardContent>
              </Card>

              {/* Latest Assessment Results */}
              <Card className="bg-muted/30 border-muted">
                <CardHeader>
                  <CardTitle>Latest Assessment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AssessmentCard
                    title="PHQ-9 Depression Scale"
                    score={8}
                    date="Jun 15, 2024"
                    status="Mild"
                    variant="primary"
                  />
                  <AssessmentCard
                    title="GAD-7 Anxiety Scale"
                    score={5}
                    date="Jun 15, 2024"
                    status="Mild"
                    variant="success"
                  />
                  <AssessmentCard
                    title="GHQ-12 General Health"
                    score={3}
                    date="Jun 14, 2024"
                    status="Good"
                    variant="purple"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Middle Row - 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressChart />
                </CardContent>
              </Card>

              {/* Today's Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <GoalItem title="Morning meditation" completed={true} />
                  <GoalItem title="Journal writing" completed={true} />
                  <GoalItem title="Take a walk" completed={false} timeLeft="2h left" />
                  <GoalItem title="Connect with friend" completed={false} timeLeft="5h left" />
                  
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Daily Progress</span>
                      <span className="font-medium text-foreground">50%</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row - Personal Wellness Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Wellness Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Days Active"
                    value="28"
                    icon={Calendar}
                    variant="warning"
                  />
                  <StatCard
                    title="Goals Achieved"
                    value="42"
                    icon={Target}
                    variant="success"
                  />
                  <StatCard
                    title="Assessments Taken"
                    value="12"
                    icon={ClipboardCheck}
                    variant="purple"
                  />
                  <StatCard
                    title="Mood Score"
                    value="8.2"
                    icon={Smile}
                    variant="primary"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;