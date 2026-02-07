import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the token hash and type from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        // Also check query params for error
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'An error occurred during verification');
          return;
        }

        if (type === 'signup' || type === 'email_change') {
          // Email verification callback
          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (sessionError) {
              setStatus('error');
              setMessage(sessionError.message);
              return;
            }

            // Sign out after verification so they can log in properly
            await supabase.auth.signOut();
            
            setStatus('success');
            setMessage('Your email has been verified successfully!');
            
            // Redirect to login after a short delay
            setTimeout(() => {
              navigate('/login', { 
                state: { message: 'Email verified! Please log in to continue.' } 
              });
            }, 2000);
          } else {
            setStatus('error');
            setMessage('Invalid verification link');
          }
        } else if (type === 'recovery') {
          // Password recovery callback
          if (accessToken && refreshToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            navigate('/reset-password');
          }
        } else {
          // No type specified, try to extract from hash
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            setStatus('error');
            setMessage('Unable to verify session');
            return;
          }

          if (data.session) {
            await supabase.auth.signOut();
            setStatus('success');
            setMessage('Your email has been verified successfully!');
            setTimeout(() => {
              navigate('/login', { 
                state: { message: 'Email verified! Please log in to continue.' } 
              });
            }, 2000);
          } else {
            setStatus('error');
            setMessage('Invalid or expired verification link');
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setMessage('An unexpected error occurred');
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="space-y-1 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {status === 'loading' && (
                      <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    )}
                    {status === 'success' && (
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    )}
                    {status === 'error' && (
                      <XCircle className="h-12 w-12 text-destructive" />
                    )}
                  </div>
                  <CardTitle className="text-2xl">
                    {status === 'loading' && 'Verifying...'}
                    {status === 'success' && 'Email Verified!'}
                    {status === 'error' && 'Verification Failed'}
                  </CardTitle>
                  <CardDescription>{message}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {status === 'success' && (
                    <p className="text-center text-sm text-muted-foreground">
                      Redirecting you to login...
                    </p>
                  )}
                  {status === 'error' && (
                    <div className="space-y-2">
                      <Button 
                        onClick={() => navigate('/register')} 
                        className="w-full"
                      >
                        Try Again
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/login')} 
                        className="w-full"
                      >
                        Go to Login
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AuthCallback;
