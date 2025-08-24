const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            FlexNet Digital
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Lovable React Interface - Your PHP site runs at /index.php
          </p>
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <p className="text-sm text-muted-foreground">
              This is the React development interface. Your actual PHP website 
              is served from the root directory at{" "}
              <a 
                href="/index.php" 
                className="text-primary hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                /index.php
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index