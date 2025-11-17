import { testDatabaseConnection } from '@/lib/supabase';

type DatabaseResult = {
  success: boolean;
  error?: any;
  data?: any;
};

export default async function TestDBPage() {
  let result: DatabaseResult;
  try {
    result = await testDatabaseConnection();
  } catch (error) {
    result = { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>
        
        {result.success ? (
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-semibold">✅ Database connection successful!</p>
            <p className="mt-2">Data: {JSON.stringify(result.data, null, 2)}</p>
          </div>
        ) : (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg">
            <p className="font-semibold">❌ Database connection failed</p>
            <p className="mt-2">Error: {result.error ? String(result.error) : 'Unknown error'}</p>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold mb-2">Connection Details:</h2>
          <pre className="text-xs bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto">
            {JSON.stringify({
              timestamp: new Date().toISOString(),
              environment: process.env.NODE_ENV,
              databaseUrl: process.env.DATABASE_URL ? '*** (hidden for security)' : 'Not set',
              nodeVersion: process.version
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
