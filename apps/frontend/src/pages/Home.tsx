import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AwardIcon, Clock, TestTubeDiagonal, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const Index = () => {
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

//   if (isAuthenticated) {
//     return <Link to="/dashboard" replace />;
//   }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center dark:text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TestTubeDiagonal className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Test_School</h1>
          </div>
          
          <p className="text-xl mb-8 dark:text-white/90 max-w-2xl mx-auto">
            Master English proficiency through our comprehensive 3-step assessment system. 
            Progress from A1 to C2 levels and earn internationally recognized certificates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 ">
            <Button asChild variant="default" size="lg">
              <Link to="/register" className="dark:text-white">Start Your Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="dark:text-white dark:border-white hover:bg-accent hover:text-primary">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete English Proficiency Assessment
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform follows the European Framework of Reference for Languages (CEFR) 
              standards to provide accurate assessment and certification.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Progressive Learning</CardTitle>
                <CardDescription>
                  Move through 6 CEFR levels from A1 to C2, unlocking each step as you progress
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <AwardIcon className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Official Certificates</CardTitle>
                <CardDescription>
                  Earn downloadable PDF certificates for each completed level with verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Timed Assessments</CardTitle>
                <CardDescription>
                  Real-time testing with auto-save functionality and resume capability
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Assessment Levels */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Assessment Levels</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { level: 'A1', name: 'Basic User', description: 'Can understand and use familiar everyday expressions' },
                { level: 'A2', name: 'Elementary', description: 'Can communicate in simple routine tasks' },
                { level: 'B1', name: 'Intermediate', description: 'Can understand main points of clear standard input' },
                { level: 'B2', name: 'Upper Intermediate', description: 'Can understand complex texts and interact fluently' },
                { level: 'C1', name: 'Advanced', description: 'Can use language flexibly and effectively' },
                { level: 'C2', name: 'Proficiency', description: 'Can understand virtually everything with ease' },
              ].map((item) => (
                <Card key={item.level} className="flex items-start gap-4 p-4">
                  <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                    {item.level}
                  </Badge>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Test Your English?
            </h3>
            <p className="text-muted-foreground mb-8">
              Join thousands of learners who have improved their English with Test_School
            </p>
            <Button asChild variant="default" size="lg" className="dark:text-white">
              <Link to="/register">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
