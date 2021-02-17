import React from 'react';
import GlobalStyles from '../layouts/GlobalStyles';

const IndexPage: React.FC = () => {
  return (
    <GlobalStyles>
      <h1>Bunch of Text</h1>
      <h2>Some more text as a sub-header</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pellentesque erat ut mauris
        fringilla imperdiet. Proin quis varius nibh. Vivamus ipsum nibh, consectetur eget elit at,
        hendrerit viverra neque. Donec non sagittis urna. Duis fringilla sodales libero sit amet
        tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Nulla sit amet viverra justo, at ornare erat. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia curae; Mauris dapibus lectus ultricies, consequat
        purus non, molestie nunc. Morbi condimentum, velit et accumsan suscipit, neque metus
        facilisis nunc, in vestibulum urna.
      </p>
    </GlobalStyles>
  );
};

export default IndexPage;
