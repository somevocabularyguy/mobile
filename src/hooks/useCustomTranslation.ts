const useCustomTranslation = (text?: string) => {
  const t = (text: string) => {
    return text;
  }
  return t;
}

export default useCustomTranslation;