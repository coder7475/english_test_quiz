import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome!
        </h1>
        <p className="text-muted-foreground">
          Explore our English proficiency platform and track your progress.
        </p>
      </div>
      <div className="text-center text-muted-foreground py-16">
        Start your journey
      </div>
    </div>
  );
};

export default Dashboard;