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

  fetchFromProxy(args) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const finalUrl = proxyUrl + args.URL;
    
    return new Promise((resolve, reject) => {
      fetch(finalUrl)
        .then(response => response.ok ? response.text() : Promise.reject('Failed to fetch'))
        .then(resolve)
        .catch(reject);
    });
  }
}

scratch.extensions.register(new ProxyExtension());
