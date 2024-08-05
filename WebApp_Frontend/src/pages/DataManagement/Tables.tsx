import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ApplicantData from '../../components/Tables/ApplicantDataTable';
import DefaultLayout from '../../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <ApplicantData />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
