import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";


import FCFSPage from "./pages/CPUScheduling/FCFSPage";
import SJFNPPage from "./pages/CPUScheduling/SJFNPPage";
import SRTFPage from "./pages/CPUScheduling/SRTFPage";
import PriorityNPPage from "./pages/CPUScheduling/PriorityNPPage";
import PriorityPage from "./pages/CPUScheduling/PriorityPage";
import RoundPage from "./pages/CPUScheduling/RoundPage";


import CPUScheduling from "./pages/CPUScheduling/CPUScheduling";
import PagingAlgo from "./pages/Paging/PagingAlgo";
import DeadlocksAlgo from "./pages/Deadlock/DeadlocksAlgo";
import DiskScheduling from "./pages/DiskScheduling/DiskScheduling";


import FIFOPagingSimulator from "./pages/Paging/FIFOPage";
import OPPagingSimulator from "./pages/Paging/OPPage";
import LRUPagingSimulator from "./pages/Paging/LRUPage";
import MRUPagingSimulator from "./pages/Paging/MRUPage";
import LFUPagingSimulator from "./pages/Paging/LFUPage";
import MFUPagingSimulator from "./pages/Paging/MFUPage";


import BankersPage from "./pages/Deadlock/BankersPage";
import DetectionPage from "./pages/Deadlock/DetectionPage";


import DiskFCFSPage from "./pages/DiskScheduling/DiskFCFSPage";
import DiskSSTFPage from "./pages/DiskScheduling/DiskSSTFPage";
import DiskSCANPage from "./pages/DiskScheduling/DiskSCANPage";
import DiskCSCANPage from "./pages/DiskScheduling/DiskCSCANPage";
import DiskLOOKPage from "./pages/DiskScheduling/DiskLOOKPage";
import DiskCLOOKPage from "./pages/DiskScheduling/DiskCLOOKPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* CPU Scheduling Algorithms */}
      <Route path="/cpu-scheduling" element={<CPUScheduling />} />
      <Route path="/cpu-scheduling/fcfs" element={<FCFSPage />} />
      <Route path="/cpu-scheduling/sjf" element={<SJFNPPage />} />
      <Route path="/cpu-scheduling/srtf" element={<SRTFPage />} />
      <Route path="/cpu-scheduling/priority" element={<PriorityNPPage />} />
      <Route
        path="/cpu-scheduling/priority-preemptive"
        element={<PriorityPage />}
      />
      <Route path="/cpu-scheduling/round-robin" element={<RoundPage />} />

      {/* Paging Algorithms */}
      <Route path="/paging" element={<PagingAlgo />} />
      <Route path="/paging/fifo" element={<FIFOPagingSimulator />} />
      <Route path="/paging/op" element={<OPPagingSimulator />} />
      <Route path="/paging/lru" element={<LRUPagingSimulator />} />
      <Route path="/paging/mru" element={<MRUPagingSimulator />} />
      <Route path="/paging/lfu" element={<LFUPagingSimulator />} />
      <Route path="/paging/mfu" element={<MFUPagingSimulator />} />

      {/* Deadlock Algorithms */}
      <Route path="/deadlock" element={<DeadlocksAlgo />} />
      <Route path="/deadlock-avoidance" element={<BankersPage />} />
      <Route path="/deadlock-detection" element={<DetectionPage />} />

      {/* Disk Scheduling Algorithms */}
      <Route path="/disk-scheduling" element={<DiskScheduling />} />
      <Route path="/disk-scheduling/fcfs" element={<DiskFCFSPage />} />
      <Route path="/disk-scheduling/sstf" element={<DiskSSTFPage />} />
      <Route path="/disk-scheduling/scan" element={<DiskSCANPage />} />
      <Route path="/disk-scheduling/c-scan" element={<DiskCSCANPage />} />
      <Route path="/disk-scheduling/look" element={<DiskLOOKPage />} />
      <Route path="/disk-scheduling/c-look" element={<DiskCLOOKPage />} />
    </Routes>
  );
}

export default App;
