import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';



export function FileUpload({ documents, onChange }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (files) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const pdfFiles = fileArray.filter(file => file.type === 'application/pdf');
    
    if (fileArray.length !== pdfFiles.length) {
      toast({
        title: 'Invalid file type',
        description: 'Only PDF files are allowed',
        variant: 'destructive'
      });
      return;
    }

    if (documents.length + pdfFiles.length > 3) {
      toast({
        title: 'Too many files',
        description: 'You can only upload up to 3 documents',
        variant: 'destructive'
      });
      return;
    }

    const newDocuments = pdfFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size,
      file
    }));

    onChange([...documents, ...newDocuments]);
  };

  const removeDocument = (id) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    onChange(updatedDocuments);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <Card 
        className={`border-dashed border-2 transition-colors ${
          isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFileSelect(e.dataTransfer.files);
        }}
      >
        <CardContent className="p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop PDF files here, or click to select
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Maximum 3 files, PDF only
          </p>
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <Button 
            type="button"
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Select Files
          </Button>
        </CardContent>
      </Card>

      {documents.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Documents:</p>
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeDocument(doc.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}