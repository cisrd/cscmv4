import { Drawer, Space} from "antd";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { treeviewStore } from "@/store/settings";
import { Button } from "@/components/ui/button";

const FormTreeview = () => {
  const treeviewZustand = treeviewStore((state: any) => state.treeviewZustand);
  const updateTreeview = treeviewStore((state: any) => state.updateTreeview);

  // Handler to update local state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    updateTreeview({
      treeviewData: {
        ...treeviewZustand.treeviewData,
        [field]: e.target.value,
      },
    });
  };

  return (
    <>
      <Drawer
        title="Edit Treeview"
        onClose={() => {
          updateTreeview({ isSheetOpen: false });
        }}
        width={400}
        extra={
          <Space>
            <Button variant="create" onClick={() => updateTreeview({ isSheetOpen: false })}>
              Update
            </Button>
          </Space>
        }
        open={treeviewZustand.isSheetOpen}
      >
        <div className="flex flex-col items-start gap-y-3 pb-8">
        
        <Label htmlFor="name-input">
            Name
          </Label>
          <Input
            id="name-input"
            name="name"
            value={treeviewZustand.treeviewData.name || ''}
            onChange={(e) => handleInputChange(e, 'name')}
          />
        </div>
      </Drawer>
    </>
  );
};

export default FormTreeview;
