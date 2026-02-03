import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, profile, logout } = useAuth();

  if (!user) {
    return null;
  }

  const displayName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Not set';

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-16">
          <section className="bg-gradient-surface py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  My Profile
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Manage your account information and preferences.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Profile Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>
                        Your basic account details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{displayName}</p>
                        </div>
                      </div>

                      {profile?.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{profile.phone}</p>
                          </div>
                        </div>
                      )}

                      {profile?.address && (
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p className="font-medium">{profile.address}</p>
                          </div>
                        </div>
                      )}

                      {profile?.created_at && (
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Member Since</p>
                            <p className="font-medium">
                              {new Date(profile.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pt-4">
                        <Button className="w-full">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Status</CardTitle>
                      <CardDescription>
                        Your account information and status
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Account Status</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Email Verified</span>
                        <Badge variant="default">Verified</Badge>
                      </div>

                      <div className="pt-4 space-y-2">
                        <Link to="/forgot-password">
                          <Button variant="outline" className="w-full">
                            Change Password
                          </Button>
                        </Link>
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={logout}
                        >
                          Sign Out
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Your recent order history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No orders yet</p>
                      <p className="text-sm">Your orders will appear here once you make a purchase.</p>
                      <Link to="/car-parts">
                        <Button className="mt-4">Browse Parts</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
