FROM --platform=windows/amd64 mcr.microsoft.com/windows/servercore:ltsc2022-amd64

ARG cippurl
ARG cippapiurl
ARG cipporigin

ENV env_cippurl=$cippurl
ENV env_cippapiurl=$cippapiurl
ENV env_cipporigin=$cipporigin

RUN powershell.exe -Command \
    Invoke-WebRequest -Uri https://github.com/microsoft/winget-cli/releases/download/v1.7.10861/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle -OutFile Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle; \
    Add-AppxPackage -Path Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle

RUN powershell.exe -Command \
    $ErrorActionPreference = 'Stop'; \
    winget install --exact Microsoft.VisualStudioCode; \
    winget install --exact Microsoft.PowerShell; \
    winget install --exact Microsoft.Git; \
    winget install --exact OpenJS.NodeJS.LTS -v 18.20.2; \
    winget install --exact Microsoft.DotNet.SDK.3_1; \
    winget install --exact Microsoft.DotNet.SDK.5; \
    winget install --exact Microsoft.DotNet.SDK.6

RUN powershell.exe -Command \
    npm install --global @azure/static-web-apps-cli; \
    npm install --global azure-functions-core-tools@4 --unsafe-perms true; \
    npm install --global azurite; \
    npm install

RUN powershell.exe -Command \
    mkdir 'C:\CIPP-Dev'; \
    cd 'C:\CIPP-Dev'; \
    git clone $env_cippurl--origin $env_cipporigin; \
    git clone $env_cippapiurl --origin $env_cipporigin; \
    cd 'C:\CIPP-Dev\CIPP'; \
    git remote add upstream https://github.com/KelvinTegelaar/CIPP; \
    git pull --all; \
    git checkout dev; \
    cd 'C:\CIPP-Dev\CIPP-API'; \
    git remote add upstream https://github.com/KelvinTegelaar/CIPP-API; \
    git pull --all; \
    git checkout dev

EXPOSE 8006
VOLUME /CIPP-Dev

ENV RAM_SIZE "4G"
ENV CPU_CORES "2"
ENV DISK_SIZE "64G"
