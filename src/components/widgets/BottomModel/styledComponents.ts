import styled from 'styled-components';
import Colors from '../../../utils/Colors';

export const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  flex-direction: row;
  align-items: flex-end;
`;
export const BottomSection = styled.View`
  width: 100%;
  justify-content: ${'flex-start'};
  align-items: ${'flex-start'};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: auto;
`;

export const Line = styled.View`
  width: ${'40px'};
  background-color: ${`#ffffff`};
  height: ${'2px'};
  margin-bottom: ${'10px'};
  align-self: center;
`;

export const Container = styled.View`
  width: ${'100%'};
  padding: ${'16px'};
  paddingTop:${'20px'};
  background-color: ${`#ffffff`};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
