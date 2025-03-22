function AssetItem() {
  return (
    <div className="min-w-40 p-3 min-h-40 rounded-xl bg-gray-600 flex justify-between">
      <div></div>
    </div>
  );
}

function Assets() {
  return (
    <div className="text-white my-8">
      <h3 className="text-2xl font-bold p-3">Assets</h3>
      <div className="flex gap-6 w-full overflow-x-scroll p-3">
        <AssetItem />
        <AssetItem />
        <AssetItem />
        <AssetItem />
        <AssetItem />
        <AssetItem />
        <AssetItem />
        <AssetItem />
        <AssetItem />
      </div>
    </div>
  );
}

export default Assets;
