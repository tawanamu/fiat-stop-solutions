import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash2, Search, Loader2, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PartImageUpload from '@/components/admin/PartImageUpload';

interface Part {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  stock_quantity: number;
  condition: string | null;
  part_number: string | null;
  category_id: string | null;
  in_stock: boolean | null;
  fast_delivery: boolean | null;
  slug: string | null;
  images?: string[];
}

interface Category {
  id: string;
  name: string;
}

const AdminParts = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    stock_quantity: '0',
    condition: 'used',
    part_number: '',
    category_id: '',
    in_stock: true,
    fast_delivery: false,
  });

  useEffect(() => {
    fetchParts();
    fetchCategories();
  }, []);

  const fetchParts = async () => {
    try {
      const { data, error } = await supabase
        .from('parts')
        .select(`
          *,
          part_images(image_url, display_order)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to include images array
      const partsWithImages = (data || []).map((part: any) => ({
        ...part,
        images: (part.part_images || [])
          .sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0))
          .map((img: any) => img.image_url),
      }));
      
      setParts(partsWithImages);
    } catch (error) {
      console.error('Error fetching parts:', error);
      toast({ title: 'Error', description: 'Failed to fetch parts', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      stock_quantity: '0',
      condition: 'used',
      part_number: '',
      category_id: '',
      in_stock: true,
      fast_delivery: false,
    });
    setImages([]);
    setEditingPart(null);
  };

  const openEditDialog = (part: Part) => {
    setEditingPart(part);
    setFormData({
      name: part.name,
      description: part.description || '',
      price: part.price.toString(),
      original_price: part.original_price?.toString() || '',
      stock_quantity: part.stock_quantity.toString(),
      condition: part.condition || 'used',
      part_number: part.part_number || '',
      category_id: part.category_id || '',
      in_stock: part.in_stock ?? true,
      fast_delivery: part.fast_delivery ?? false,
    });
    setImages(part.images || []);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const partData = {
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        stock_quantity: parseInt(formData.stock_quantity),
        condition: formData.condition,
        part_number: formData.part_number || null,
        category_id: formData.category_id || null,
        fast_delivery: formData.fast_delivery,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      };

      let partId = editingPart?.id;

      if (editingPart) {
        const { error } = await supabase
          .from('parts')
          .update(partData)
          .eq('id', editingPart.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('parts')
          .insert([partData])
          .select('id')
          .single();
        if (error) throw error;
        partId = data.id;
      }

      // Update images
      if (partId) {
        // Delete existing images
        await supabase.from('part_images').delete().eq('part_id', partId);

        // Insert new images with display order
        if (images.length > 0) {
          const imageRecords = images.map((url, index) => ({
            part_id: partId,
            image_url: url,
            display_order: index,
          }));
          const { error: imgError } = await supabase.from('part_images').insert(imageRecords);
          if (imgError) throw imgError;
        }
      }

      toast({ title: 'Success', description: editingPart ? 'Part updated successfully' : 'Part created successfully' });
      setIsDialogOpen(false);
      resetForm();
      fetchParts();
    } catch (error: any) {
      console.error('Error saving part:', error);
      toast({ title: 'Error', description: error.message || 'Failed to save part', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this part?')) return;

    try {
      const { error } = await supabase.from('parts').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Part deleted successfully' });
      fetchParts();
    } catch (error: any) {
      console.error('Error deleting part:', error);
      toast({ title: 'Error', description: error.message || 'Failed to delete part', variant: 'destructive' });
    }
  };

  const filteredParts = parts.filter(
    (part) =>
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.part_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Parts Management</h1>
            <p className="text-muted-foreground">Manage your car parts inventory</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Part
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPart ? 'Edit Part' : 'Add New Part'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="part_number">Part Number</Label>
                    <Input
                      id="part_number"
                      value={formData.part_number}
                      onChange={(e) => setFormData({ ...formData, part_number: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original_price">Original Price (€)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      step="0.01"
                      value={formData.original_price}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock_quantity">Stock Quantity</Label>
                    <Input
                      id="stock_quantity"
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used">Used</SelectItem>
                        <SelectItem value="refurbished">Refurbished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="fast_delivery"
                    checked={formData.fast_delivery}
                    onCheckedChange={(checked) => setFormData({ ...formData, fast_delivery: checked })}
                  />
                  <Label htmlFor="fast_delivery">Fast Delivery</Label>
                </div>

                {/* Image Upload */}
                <PartImageUpload
                  partId={editingPart?.id}
                  images={images}
                  onImagesChange={setImages}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingPart ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or part number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Parts Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Part Number</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredParts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No parts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredParts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell>
                      {part.images && part.images.length > 0 ? (
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                          <img 
                            src={part.images[0]} 
                            alt={part.name}
                            className="w-full h-full object-cover"
                          />
                          {part.images.length > 1 && (
                            <span className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-1">
                              +{part.images.length - 1}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{part.name}</TableCell>
                    <TableCell>{part.part_number || '-'}</TableCell>
                    <TableCell>€{part.price.toFixed(2)}</TableCell>
                    <TableCell>{part.stock_quantity}</TableCell>
                    <TableCell className="capitalize">{part.condition || '-'}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          part.in_stock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {part.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => openEditDialog(part)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(part.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminParts;
