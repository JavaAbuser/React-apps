import { useMemo } from 'react';

export default ({
                  neededAuthorities,
                  ownedAuthorities
}) => {
  return useMemo(() => {
    return neededAuthorities.every(auth => ownedAuthorities.includes(auth));
  }, [ownedAuthorities]);
}