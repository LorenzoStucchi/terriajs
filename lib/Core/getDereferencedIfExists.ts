import { BaseModel } from "../Models/Model";
import GroupMixin from "../ModelMixins/GroupMixin";
import ReferenceMixin from "../ModelMixins/ReferenceMixin";

export default function getDereferencedIfExists(
  item: BaseModel | GroupMixin.Instance
): BaseModel | GroupMixin.Instance {
  if (ReferenceMixin.is(item) && item.target) {
    return item.target;
  }
  return item;
}
