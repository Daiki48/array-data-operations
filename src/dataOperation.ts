const DATA_FILE = "./data.json";

export const dataOperation = async () => {
  const args = Deno.args;
  const ary: string[] = await loadData();

  if (args[0] === "--add" || args[0] === "--delete") {
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "--add" && args[i + 1]) {
        ary.push(args[i + 1]);
        console.log(`Added ${args[i + 1]} to the array : `, ary);
        i++;
      } else if (args[i] === "--delete" && args[i + 1]) {
        const index = ary.indexOf(args[i + 1]);
        if (index !== -1) {
          ary.splice(index, 1);
          console.log(`Deleted ${args[i + 1]} from the array : `, ary);
        }
        i++;
      }
    }
    saveData(ary);
  } else if (args[0] === "--list") {
    console.log("Data list");
    console.log(ary);
  } else {
    console.log("Not option");
  }
};

const loadData = async () => {
  try {
    const data = await Deno.readTextFile(DATA_FILE);
    return JSON.parse(data);
  } catch (e) {
    console.log("No Data Load", e);
    return [];
  }
};

const saveData = async (data: string[]) => {
  await Deno.writeTextFile(DATA_FILE, JSON.stringify(data));
};
