const shortName=(name:string)=>{
    const newName:string=name.split(" ")

    const newTitle=`${newName[0]} ${newName[1]}`
    return newTitle
}


export {shortName}