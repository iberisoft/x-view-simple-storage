using Dicom;
using Dicom.Imaging;
using SixLabors.ImageSharp;

ImageManager.SetImplementation(new ImageSharpImageManager());

if (args.Length < 2)
{
    Console.WriteLine("Usage: dcm2jpg <dcmFilePath> <jpgFilePath>");
    return;
}

var file = DicomFile.Open(args[0]);
var image = new DicomImage(file.Dataset);
using var renderedImage = image.RenderImage();
using var bitmap = renderedImage.AsSharpImage();
bitmap.Save(args[1]);
