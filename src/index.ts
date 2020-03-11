import { useState, useEffect } from "react";

const stores: any = {};

class Store {
  value: any = "";
  setters: Array<any> = [];
  setValue = (value: any) => {
    this.value = value;
    this.setters.forEach((setter: any) => setter(this.value));
  };
  addSetter = (setter: any) => {
    this.setters = [...this.setters, setter];
  };
  unsubscribe = (setter: any) => {
    this.setters = this.setters.filter(s => s !== setter);
  };
}

export const setGlobalState = (
  id: string,
  value: any
) => {
  if (!stores[id]) {
    stores[id] = new Store();
    stores[id].setValue(value);
  } else {
    stores[id].setValue(value);
  }
};

export const getGlobalState = (id: string) => {
  try {
    return stores[id].value;
  } catch (error) {
    console.error(`No gloabl value for id: ${id}`);
  }
}

export const useGlobalState = (id: string, initialValue: any = ""): [any, Function] => {
  const [_, set] = useState("");

  if (!stores.hasOwnProperty(id)) {
    stores[id] = new Store();
    stores[id].setValue(initialValue);
  }

  if (!stores[id].setters.includes(set)) {
    stores[id].addSetter(set);
  }

  const {
    value,
    setValue,
    unsubscribe
  } = stores[id];

  useEffect(() => () => unsubscribe(set), []);

  return [value, setValue];
}