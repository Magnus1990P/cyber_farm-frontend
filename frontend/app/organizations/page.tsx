import {OrganizationsGrid} from './organizationgrid'
import {CreateOrganization} from './create_organization'

export default function Page() {
  return (
    <>
      <CreateOrganization />
      <OrganizationsGrid />
    </>
  );
}