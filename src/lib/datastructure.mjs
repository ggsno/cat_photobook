class Breadcrumb {
  constructor(dirList) {
    this.dirList = dirList;
  }

  pushDir(dir) {
    this.dirList.push(dir);
  }

  popDir() {
    return this.dirList.pop();
  }

  peekDir() {
    return this.dirList[this.dirList.length - 1];
  }
  
}

class DirInfo {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export { Breadcrumb, DirInfo };