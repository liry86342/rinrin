class ProxyExtension {
  getInfo() {
    return {
      id: 'proxy',
      name: 'Proxy Extension',
      blocks: [
        {
          opcode: 'fetchFromProxy',
          blockType: Scratch.BlockType.REPORTER,
          text: 'fetch from proxy [URL]',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://example.com'
            }
          }
        }
      ]
    };
  }

  async fetchFromProxy(args) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const finalUrl = proxyUrl + args.URL;
    
    try {
      let response = await fetch(finalUrl);
      if (!response.ok) throw new Error('Failed to fetch');
      let data = await response.text();
      return data;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}

scratch.extensions.register(new ProxyExtension());
