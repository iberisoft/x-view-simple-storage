using FellowOakDicom;
using FellowOakDicom.Imaging;
using FellowOakDicom.Imaging.NativeCodec;
using SixLabors.ImageSharp;

new DicomSetupBuilder()
    .RegisterServices(services => services.AddFellowOakDicom()
        .AddImageManager<ImageSharpImageManager>()
        .AddTranscoderManager<NativeTranscoderManager>())
    .Build();

if (args.Length < 2)
{
    Console.WriteLine("Usage: dcm2jpg <dcmFilePath> <jpgFilePath>");
    return;
}

var file = DicomFile.Open(args[0]);
var image = new DicomImage(file.Dataset)
{
    ShowOverlays = false
};
using var renderedImage = image.RenderImage();
using var bitmap = renderedImage.AsSharpImage();
bitmap.Save(args[1]);
