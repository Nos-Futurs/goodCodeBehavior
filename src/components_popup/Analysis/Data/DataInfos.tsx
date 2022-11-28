import React from "react";

export const DataInfos = () => {
  return (
    <div>
      <h1>Information regarding the data tracking method : </h1>
      <h2>How does it work ?</h2>
      <p>
        Here, we try to monitor the data transferred between your browser and
        the servers. The communication between those two follow the HyperText
        Transfer Protocol (HTTP). Prior to each HTTP request you have the
        headers which provides additional information about the context and the
        content of the request. When the purpose of the request is to pass data
        (through a body), the headers have a section named "content-length".
        This content length give us the number of bytes exchanged by this
        request.
      </p>
      <h2>What are the limitations ? </h2>
      <p>
        The biggest limitation is that we can also pass information using
        chunked encoded. If it is the case there won't be any content-length
        headers, thus we won't record this data exchange.
      </p>
    </div>
  );
};
