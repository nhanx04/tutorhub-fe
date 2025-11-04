import { IconDocEmpty } from "./icons";

export default function EmptyContent() {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
      <div className="text-center text-sm text-gray-500">
        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
          <IconDocEmpty className="text-gray-400" />
        </div>
        <div className="font-medium">Nội dung tài liệu đang được phát triển</div>
        <div className="text-xs text-gray-400">Chức năng hiển thị nội dung sẽ được cập nhật sau</div>
      </div>
    </div>
  );
}
