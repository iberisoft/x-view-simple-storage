# XView Service

This is a simple backend service used by [XView](https://github.com/iberisoft/x-view.git) and developed for demonstration purposes.

The `dcm2jpg` tool is used to convert DICOM files to JPEG for prerendering.

## Prerequisites

* [Node.js](https://nodejs.org)
* [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

## Dependencies

Add the project dependencies:
```
npm install
```

### Building ###

Build `dcm2jpg` tool:
```
cd dcm2jpg
dotnet build -c Release
```

## Running

Run the service:
```
npm run start <rootPath>
```
