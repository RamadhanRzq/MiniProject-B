/* eslint-disable react/prop-types */
export default function PromptDelete({ onCancel, onConfirm, title }) {
  return (
    <div className="flex min-h-screen justify-center items-center popupstyle ">
      <div className="prompt-content bg-white p-10 rounded-lg">
        <p className="text-black">{title}</p>
        <div className="flex prompt-buttons gap-10 justify-center mt-10 rounded-lg">
          <button className="hover:bg-gray-200" onClick={onConfirm}>
            Ya, Hapus
          </button>
          <button className="hover:bg-gray-200" onClick={onCancel}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
