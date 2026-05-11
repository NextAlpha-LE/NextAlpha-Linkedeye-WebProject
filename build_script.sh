#!/bin/bash
#Author : Ponmuthu M
__V=1.0.0.0

if [ ! $# -ge 2  ];then
        echo -e "$(basename $0) {FolderName] {VersionNumber} {PushDockerHub}

version : ${__V}

Ex
 FolderName :  linkedeye-monitor/all
 VersionNumber : 1.0.0.1
 PushDockerHub (off/dev/uat/prod) => *off Default\n"
exit 1
fi

CURPATH=`pwd`
_FolderName=$1
_VersionNumber=$2
_PushDockerHub=off
if [ $# == 3 ];then _PushDockerHub=$3;fi

UI_HOME="LinkedEyeWebProject/"
LIB_HOME="LinkedEyeWebProject/lib/"

Black="\033[0;30m"
DarkGray="\033[1;30m"
Red="\033[0;31m"
LightRed="\033[1;31m"
Green="\033[0;32m"
LightGreen="\033[1;32m"
Orange="\033[0;33m"
Yellow="\033[1;33m"
Blue="\033[0;34m"
LightBlue="\033[1;34m"
Purple="\033[0;35m"
LightPurple="\033[1;35m"
Cyan="\033[0;36m"
LightCyan="\033[1;36m"
LightGray="\033[0;37m"
White="\033[1;37m"
NC='\033[0m' # No Color


function pre_clean(){

rm -rf ./${UI_HOME}template/DIRECT/SERVICES/Linux/Hypersync/DISCOVER_Hypersync*
}

function python_libs(){

printf "${Red}Downloading all Libraries${NC} : "

pip3 install --target="`pwd`/python" -r ./requirement.txt
echo
}

function build(){

folder=$1
imageName=`echo $folder | tr [:upper:] [:lower:]`
image=$2
push=$3

label="latest"
if [ $push == "prod" ]
then
   repo="registry.gitlab.com/finspot-prod/finspot-images/"
elif [ $push == "off" ]
then
   repo="registry.gitlab.com/finspot-devel/finspot-images/"
   label="dev"
elif [ $push == "uat" ]
then
   repo="registry.gitlab.com/finspot-uat/finspot-images/"
elif [ $push == "dev" ]
then
   repo="registry.gitlab.com/finspot-devel/finspot-images/"
elif [ $push == "dev_beta" ]
then
   repo="registry.gitlab.com/finspot-devel/finspot-images/"
   label="beta"
elif [ $push == "prod_beta" ]
then
   repo="registry.gitlab.com/finspot-prod/finspot-images/"
   label="new"
fi

        cd ${CURPATH} > /dev/null
        if [ ! -d ${folder} ];then
                printf "${Red}Error FolderNotFound : ${folder}${NC}\n";
                return
        fi
        cd ${folder} > /dev/null
        if [ ! -f Dockerfile ];then
                printf "${Red}Error FileNotFound : Dockerfile${NC}\n";
                return
        fi
        printf "\n\n Building Started .... \n"
        sleep 5
        cp -r ${CURPATH}/python ${CURPATH}/${folder}
        cp -r ${CURPATH}/utils ${CURPATH}/${folder}
        docker build -t ${repo}${imageName}:${image} .
        [[ ! $? == 0  ]] && exit 1
        printf "\n${Blue}Tagging Image : ${NC}${Orange} ${repo}${imageName}:${image} ${NC}${White}--to--> ${NC}${Blue}${repo}${imageName}:${label} ${NC}\n"
        docker tag ${repo}${imageName}:${image} ${repo}${imageName}:${label}

        if [ ! $push == "off" ];then

                printf "\n${Blue}Pushing Image : ${NC}${Orange} ${repo}${imageName}:${image} ${NC}${White}--to--> ${NC}${Blue}Gitlab Registry${NC}\n"
                sleep 2
                docker push ${repo}${imageName}:${image}
                printf "\n${Blue}Pushing Image : ${NC}${Orange} ${repo}${imageName}:${label} ${NC}${White}--to--> ${NC}${Blue}Gitlab Registry${NC}\n"
                docker push ${repo}${imageName}:${label}
                if [ $? == 0  ]
                then
                        printf "${Green}Succeed${NC}\n\n"
                else
                        printf "${Red}Failed${NC}\n\n"
                        exit 1
                fi
        fi
        rm -rf ${CURPATH}/${folder}/python
        rm -rf ${CURPATH}/${folder}/utils
        cd ${CURPATH}
}

##
pre_clean
printf "${Red}Copying LinkedEyeEntity from ${UI_HOME}${NC} : "
\cp -r ./${LIB_HOME}LinkedEyeEntity ./python/
printf "${Green}Copied${NC}\n\n"

printf "${Red}Copying LinkedEyeVault from ${UI_HOME}${NC} : "
\cp -r ./${LIB_HOME}LinkedEyeVault ./python/
printf "${Green}Copied${NC}\n\n"

printf "${Red}Copying LinkedEyeDiscover from ${UI_HOME}${NC} : "
\cp -r ./${LIB_HOME}LinkedEyeDiscover ./python/
printf "${Green}Copied${NC}\n\n"

printf "${Red}Copying LinkedEyeStruct from ${UI_HOME}${NC} : "
\cp -r ./${LIB_HOME}LinkedEyeStruct ./python/
printf "${Green}Copied${NC}\n\n"

printf "${Red}Copying LinkedEyeMQ  from ${UI_HOME}${NC} : "
\cp -r ./${LIB_HOME}LinkedEyeMQ  ./python/
printf "${Green}Copied${NC}\n\n"

printf "${Red}Copying LinkedEyeRedis  from ${UI_HOME}${NC} : "
\cp -r ./${LIB_HOME}LinkedEyeRedis  ./python/
printf "${Green}Copied${NC}\n\n"

printf "${Red}Copying LinkedEyeNotification  from ${UI_HOME}${NC} : "
\cp -r ./${LIB_HOME}LinkedEyeNotification  ./python/
printf "${Green}Copied${NC}\n\n"

##

python_libs
if [ ${_FolderName} == 'all' ];then
        ls . | grep "linkedeye-"  | while read __FolderName
        do
          sed  "s/BUILDVERSION/${_VersionNumber}/g" buildinfo.js > ${UI_HOME}app/static/app/js_src/buildinfo.js
          printf "${Blue}Building Docker Image for ${NC}${Orange}${__FolderName}${NC}${Blue} V: ${NC}${Orange}${_VersionNumber}${NC}\t"
          cd ${CURPATH} > /dev/null
          build ${__FolderName} ${_VersionNumber} ${_PushDockerHub}
        done
else
        if [ ${_FolderName} == "${UI_HOME}" ];then
          echo "BUILDVERSION = ${_VersionNumber}  `date +%d%m%Y-%H%M%S`"
          sed  "s/BUILDVERSION/${_VersionNumber}  `date +%d%m%Y-%H%M%S`/g" buildinfo.js > ${UI_HOME}app/static/app/js_src/buildinfo.js
          #cp -r nagios script template utils ${UI_HOME}/.
          cp -r script utils ${UI_HOME}/.
        fi
        _FolderName=`echo ${_FolderName} | sed -e "s/\///g"`
        printf "${Blue}Building Docker Image for ${NC}${Orange}${_FolderName}${NC}${Blue} V: ${NC}${Orange}${_VersionNumber}${NC}\t"
        cd ${CURPATH} > /dev/null
        build ${_FolderName} ${_VersionNumber} ${_PushDockerHub}
        #rm -rf ${UI_HOME}script ${UI_HOME}template ${UI_HOME}utils ${UI_HOME}nagios
        rm -rf ${UI_HOME}script ${UI_HOME}utils
fi
cp buildinfo.js ${UI_HOME}app/static/app/js_src/buildinfo.js

#END
