import { CouncilSelect } from '@/components';
import WorkerRewards from '@/components/WorkerRewardTable';
import { useSelectedCouncil } from '@/store';
import { Link } from 'react-router-dom';

export default function App () {
  const { council, setCouncil } = useSelectedCouncil();
  return (
    <div style={{ backgroundColor: 'black' }}>
      <h1 className='text-center text-white'>Workers Rewards</h1> 
      <CouncilSelect council={council} onChange={setCouncil} />
      <WorkerRewards/>
      <Link to="/">Back</Link>
    </div>
  );
}
