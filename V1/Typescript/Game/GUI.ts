namespace V1 {
  export interface IGUI {
    addToRoot(root: IGUI): void;
    addChild(child: IGUI): void;
  }
}