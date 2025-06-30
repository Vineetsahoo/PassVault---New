import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaShieldAlt, FaCreditCard, FaBell, FaKey, FaUserCog, 
  FaHistory, FaCrown, FaFingerprint, FaCamera, FaEnvelope,
  FaLanguage, FaMoon, FaLock, FaTrash, FaDownload, FaArrowLeft,
  FaBriefcase, FaMapMarkerAlt, FaPhoneAlt, FaGlobe, 
  FaLinkedin, FaGithub, FaTwitter, FaCalendarAlt,
  FaGraduationCap, FaIdCard, FaBirthdayCake, FaPassport,
  FaUserTie, FaBuilding, FaAddressCard,
  FaUser, FaCheckCircle, FaFileInvoiceDollar, FaReceipt, FaFilePdf,
  FaCcVisa, FaCcMastercard, FaFileSignature, FaFileContract,
  FaFileAlt, FaFileMedical, FaQrcode, FaListAlt, FaEdit,
  FaUserSecret, FaUsers, FaShieldVirus, FaFileExport, FaEllipsisH, 
  FaExclamationTriangle, FaChevronRight, FaCog
} from 'react-icons/fa';
import { HiOutlineUserCircle } from 'react-icons/hi';

interface IUserProfile {
  name: string;
  email: string;
  role: string;
  preferences: {
    theme: string;
    notifications: boolean;
    language: string;
  };
  avatar: string;
  memberSince: string;
  lastLogin: string;
  securityScore: number;
  twoFactorEnabled: boolean;
  totalDevices: number;
  activeSubscription: string;
  nextBilling: string;
  personalInfo: {
    dateOfBirth: string;
    phoneNumber: string;
    nationality: string;
    maritalStatus: string;
    gender: string;
  };
  professionalInfo: {
    occupation: string;
    company: string;
    department: string;
    employeeId: string;
    experience: string;
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  socialProfiles: {
    linkedin: string;
    github: string;
    twitter: string;
    website: string;
  };
  identityDocuments: {
    type: string;
    number: string;
    expiryDate: string;
  }[];
  bankingInfo: {
    accountHolder: string;
    accountType: string;
    lastFourDigits: string;
  };
  security: {
    lastPasswordChange: string;
    loginAttempts: number;
    securityQuestions: number;
    activeDevices: number;
    loginHistory: Array<{
      device: string;
      location: string;
      time: string;
      status: 'success' | 'failed';
    }>;
    recoveryEmail: string;
    backupCodes: number;
  };
  documents: {
    identity: Array<{
      type: string;
      number: string;
      expiryDate: string;
      status: 'active' | 'expired';
      fileUrl: string;
    }>;
    financial: Array<{
      type: string;
      institution: string;
      lastUpdated: string;
      fileUrl: string;
    }>;
    others: Array<{
      name: string;
      category: string;
      uploadDate: string;
      fileUrl: string;
    }>;
  };
  billing: {
    paymentMethods: Array<{
      type: 'credit' | 'debit';
      provider: string;
      lastFour: string;
      expiryDate: string;
      isDefault: boolean;
    }>;
    invoices: Array<{
      id: string;
      date: string;
      amount: number;
      status: 'paid' | 'pending';
      downloadUrl: string;
    }>;
    subscriptionHistory: Array<{
      plan: string;
      startDate: string;
      endDate: string;
      amount: number;
      status: 'active' | 'expired';
    }>;
  };
}

const UserProfileHeader: React.FC<{ profile: IUserProfile }> = ({ profile }) => (
  <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-indigo-600 to-purple-700 mb-8">
    <div className="absolute inset-0 bg-pattern opacity-10"></div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-10 -translate-y-20"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-10 translate-y-20"></div>
    
    <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
      <div className="relative group">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-0 right-0 p-2 bg-white text-indigo-600 rounded-full shadow-lg hover:bg-indigo-50 transition-all"
        >
          <FaCamera className="w-4 h-4" />
        </motion.button>
      </div>
      
      <div className="text-center md:text-left text-white">
        <h1 className="text-2xl sm:text-3xl font-bold">{profile.name}</h1>
        <p className="text-indigo-100">{profile.email}</p>
        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
            {profile.role}
          </span>
          {profile.twoFactorEnabled && (
            <span className="px-4 py-1.5 bg-green-600/30 backdrop-blur-sm border border-green-300/30 rounded-full text-white text-sm font-medium flex items-center gap-1.5">
              <FaShieldAlt className="text-green-100" size={12} /> 2FA Enabled
            </span>
          )}
        </div>
      </div>
      
      <div className="ml-auto hidden lg:flex items-center gap-6 text-white/80">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-white">{profile.securityScore}%</span>
          <span className="text-xs">Security Score</span>
        </div>
        <div className="h-12 w-0.5 bg-white/20"></div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-white">{profile.totalDevices}</span>
          <span className="text-xs">Devices</span>
        </div>
        <div className="h-12 w-0.5 bg-white/20"></div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-white">{profile.memberSince}</span>
          <span className="text-xs">Member Since</span>
        </div>
      </div>
    </div>
    
    <div className="bg-indigo-800/30 backdrop-blur-sm flex items-center justify-between px-6 sm:px-8 py-3 border-t border-white/10">
      <div className="text-white/70 text-sm flex items-center gap-2">
        <FaHistory size={12} /> Last login: {profile.lastLogin}
      </div>
      <div className="flex items-center">
        <motion.button
          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          className="p-2 rounded-full text-white/80 hover:text-white"
        >
          <FaEdit className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          className="p-2 rounded-full text-white/80 hover:text-white"
        >
          <FaEllipsisH className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  </div>
);

const ProfileSection: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
  >
    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </motion.div>
);

const InfoCard: React.FC<{ label: string; value: string; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 400 }}
    className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-all"
  >
    <div className="flex items-center gap-3">
      {icon && <div className="text-indigo-500">{icon}</div>}
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  </motion.div>
);

const PersonalInfoCard: React.FC<{ info: IUserProfile['personalInfo'] }> = ({ info }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <InfoCard 
      label="Date of Birth" 
      value={info.dateOfBirth}
      icon={<FaBirthdayCake />}
    />
    <InfoCard 
      label="Phone Number" 
      value={info.phoneNumber}
      icon={<FaPhoneAlt />}
    />
    <InfoCard 
      label="Nationality" 
      value={info.nationality}
      icon={<FaPassport />}
    />
    <InfoCard 
      label="Marital Status" 
      value={info.maritalStatus}
      icon={<FaUsers />}
    />
    <InfoCard 
      label="Gender" 
      value={info.gender}
      icon={<FaUserSecret />}
    />
  </div>
);

const AddressCard: React.FC<{ address: IUserProfile['address'] }> = ({ address }) => (
  <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
        <FaMapMarkerAlt className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-1">{address.street}</h3>
        <p className="text-gray-600">{`${address.city}, ${address.state}`}</p>
        <p className="text-gray-600">{`${address.country} - ${address.postalCode}`}</p>
      </div>
      <div className="ml-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-200 text-gray-500"
        >
          <FaEdit />
        </motion.button>
      </div>
    </div>
  </div>
);

const ProfessionalInfoCard: React.FC<{ info: IUserProfile['professionalInfo'] }> = ({ info }) => (
  <div className="space-y-6">
    <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white shadow-sm rounded-xl text-indigo-600">
          <FaBriefcase className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-900">{info.occupation}</h3>
          <p className="text-indigo-600">{`${info.company}`}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg">
          <p className="text-gray-500 mb-1">Department</p>
          <p className="font-medium">{info.department}</p>
        </div>
        <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg">
          <p className="text-gray-500 mb-1">Employee ID</p>
          <p className="font-medium">{info.employeeId}</p>
        </div>
        <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg">
          <p className="text-gray-500 mb-1">Experience</p>
          <p className="font-medium">{info.experience}</p>
        </div>
      </div>
    </div>
    
    <h3 className="font-medium text-gray-800 mt-6 mb-3 flex items-center gap-2">
      <FaGraduationCap />
      Education
    </h3>
    
    <div className="space-y-4">
      {info.education.map((edu, index) => (
        <motion.div 
          key={index} 
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-4 bg-white shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-12 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            <div>
              <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-indigo-600 mt-1">{edu.year}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const SocialProfilesCard: React.FC<{ profiles: IUserProfile['socialProfiles'] }> = ({ profiles }) => (
  <div className="grid grid-cols-2 gap-4">
    {Object.entries(profiles).map(([platform, url]) => (
      <motion.a
        key={platform}
        whileHover={{ y: -3, backgroundColor: "#fff" }}
        transition={{ type: "spring", stiffness: 300 }}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3 hover:shadow-md transition-all"
      >
        <div className="p-2.5 rounded-lg" style={{ 
          backgroundColor: 
            platform === 'linkedin' ? '#E8F0FE' : 
            platform === 'github' ? '#F6F8FA' : 
            platform === 'twitter' ? '#E8F5FE' : 
            '#E6F5EB'
        }}>
          {platform === 'linkedin' && <FaLinkedin className="text-blue-600 w-6 h-6" />}
          {platform === 'github' && <FaGithub className="text-gray-900 w-6 h-6" />}
          {platform === 'twitter' && <FaTwitter className="text-blue-400 w-6 h-6" />}
          {platform === 'website' && <FaGlobe className="text-green-600 w-6 h-6" />}
        </div>
        <div>
          <span className="font-medium capitalize block">{platform}</span>
          <span className="text-sm text-gray-500 block truncate max-w-[120px]">{url.replace(/^https?:\/\//, '')}</span>
        </div>
      </motion.a>
    ))}
  </div>
);

const SecuritySection: React.FC<{ security: IUserProfile['security'] }> = ({ security }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        { icon: <FaLock className="w-5 h-5" />, label: 'Last Password Change', value: security.lastPasswordChange, color: 'bg-blue-100 text-blue-600' },
        { icon: <FaQrcode className="w-5 h-5" />, label: 'Backup Codes', value: `${security.backupCodes} remaining`, color: 'bg-green-100 text-green-600' },
        { icon: <FaCheckCircle className="w-5 h-5" />, label: 'Security Questions', value: `${security.securityQuestions} set`, color: 'bg-yellow-100 text-yellow-600' },
        { icon: <FaUserCog className="w-5 h-5" />, label: 'Active Devices', value: security.activeDevices.toString(), color: 'bg-purple-100 text-purple-600' }
      ].map((item, index) => (
        <motion.div 
          key={index} 
          whileHover={{ y: -3 }}
          className="p-4 bg-white shadow-sm rounded-xl border border-gray-100 flex flex-col items-center text-center"
        >
          <div className={`p-3 rounded-full mb-3 ${item.color.split(' ')[0]}`}>
            <div className={item.color.split(' ')[1]}>{item.icon}</div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
            <p className="font-semibold">{item.value}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-6">
      <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
        <FaHistory className="text-indigo-600" /> Recent Login Activity
      </h3>
      <div className="space-y-3">
        {security.loginHistory.map((login, index) => (
          <motion.div 
            key={index}
            whileHover={{ x: 3 }}
            className={`flex items-center justify-between p-4 rounded-xl border ${
              login.status === 'success' 
                ? 'border-green-100 bg-green-50' 
                : 'border-red-100 bg-red-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                login.status === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <div className={login.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                  {login.status === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                </div>
              </div>
              <div>
                <p className="font-medium">{login.device}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <FaMapMarkerAlt size={10} />
                  <span>{login.location}</span>
                  <span className="block w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{login.time}</span>
                </div>
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full font-medium uppercase ${login.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
              {login.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const DocumentsSection: React.FC<{ documents: IUserProfile['documents'] }> = ({ documents }) => (
  <div className="space-y-8">
    <div>
      <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
        <FaIdCard className="text-indigo-600" /> Identity Documents
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.identity.map((doc, index) => (
          <motion.div 
            key={index} 
            whileHover={{ y: -3 }}
            className="flex items-center p-4 bg-white shadow-sm rounded-xl border border-gray-100"
          >
            <div className="p-3 rounded-xl bg-indigo-50 mr-4">
              <FaIdCard className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900">{doc.type}</h4>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  doc.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {doc.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">Number: {doc.number}</p>
              <p className="text-sm text-gray-500">Expires: {doc.expiryDate}</p>
            </div>
            <div className="ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <FaFilePdf className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
        <FaFileInvoiceDollar className="text-indigo-600" /> Financial Documents
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.financial.map((doc, index) => (
          <motion.div 
            key={index} 
            whileHover={{ y: -3 }}
            className="flex items-center p-4 bg-white shadow-sm rounded-xl border border-gray-100"
          >
            <div className="p-3 rounded-xl bg-green-50 mr-4">
              <FaFileInvoiceDollar className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{doc.type}</h4>
              <p className="text-sm text-gray-500">{doc.institution}</p>
              <p className="text-xs text-gray-400 mt-1">Updated {doc.lastUpdated}</p>
            </div>
            <div className="ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <FaFilePdf className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const BillingSection: React.FC<{ billing: IUserProfile['billing'] }> = ({ billing }) => (
  <div className="space-y-8">
    <div>
      <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
        <FaCreditCard className="text-indigo-600" /> Payment Methods
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {billing.paymentMethods.map((method, index) => (
          <motion.div 
            key={index} 
            whileHover={{ y: -3 }}
            className={`p-4 bg-white shadow-sm rounded-xl border ${method.isDefault ? 'border-indigo-200' : 'border-gray-100'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                method.provider === 'visa' ? 'bg-blue-50' : 'bg-orange-50'
              }`}>
                {method.provider === 'visa' ? (
                  <FaCcVisa className="w-8 h-8 text-blue-600" />
                ) : (
                  <FaCcMastercard className="w-8 h-8 text-orange-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{method.type.charAt(0).toUpperCase() + method.type.slice(1)} Card</h4>
                  {method.isDefault && (
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">•••• {method.lastFour}</p>
                <p className="text-sm text-gray-500 mt-1">Expires {method.expiryDate}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
        <FaFileInvoiceDollar className="text-indigo-600" /> Recent Invoices
      </h3>
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left font-medium text-gray-600 p-3">Invoice ID</th>
              <th className="text-left font-medium text-gray-600 p-3">Date</th>
              <th className="text-left font-medium text-gray-600 p-3">Amount</th>
              <th className="text-left font-medium text-gray-600 p-3">Status</th>
              <th className="text-left font-medium text-gray-600 p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {billing.invoices.map((invoice, index) => (
              <tr key={index} className="hover:bg-white transition-colors">
                <td className="p-3 text-gray-900 font-medium">{invoice.id}</td>
                <td className="p-3 text-gray-600">{invoice.date}</td>
                <td className="p-3 text-gray-900">₹{invoice.amount}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <FaDownload className="w-4 h-4 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');

  const userProfile: IUserProfile = {
    name: 'Demo User',
    email: 'Demo@gmail.com',
    role: 'Premium User',
    preferences: {
      theme: 'dark',
      notifications: true,
      language: 'English'
    },
    avatar: 'https://via.placeholder.com/150',
    memberSince: 'January 2023',
    lastLogin: '2 hours ago',
    securityScore: 85,
    twoFactorEnabled: true,
    totalDevices: 3,
    activeSubscription: 'Premium Plan',
    nextBilling: '01/15/2024',
    personalInfo: {
      dateOfBirth: "15 March 1990",
      phoneNumber: "+91 98765 43210",
      nationality: "Indian",
      maritalStatus: "Married",
      gender: "Male"
    },
    professionalInfo: {
      occupation: "Senior Software Engineer",
      company: "Tech Innovations Ltd",
      department: "Engineering",
      employeeId: "EMP123456",
      experience: "8+ years",
      education: [
        {
          degree: "Master of Computer Applications",
          institution: "Delhi University",
          year: "2012"
        },
        {
          degree: "Bachelor of Computer Science",
          institution: "Mumbai University",
          year: "2009"
        }
      ]
    },
    address: {
      street: "123 Cyber City, Phase 1",
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      postalCode: "122002"
    },
    socialProfiles: {
      linkedin: "https://linkedin.com/in/rahulsingh",
      github: "https://github.com/rahulsingh",
      twitter: "https://twitter.com/rahulsingh",
      website: "https://rahulsingh.dev"
    },
    identityDocuments: [
      {
        type: "Passport",
        number: "********1234",
        expiryDate: "2028"
      },
      {
        type: "National ID",
        number: "********5678",
        expiryDate: "2025"
      }
    ],
    bankingInfo: {
      accountHolder: "Rahul Singh",
      accountType: "Savings",
      lastFourDigits: "4321"
    },
    security: {
      lastPasswordChange: '1 month ago',
      loginAttempts: 5,
      securityQuestions: 3,
      activeDevices: 2,
      loginHistory: [
        { device: 'iPhone 12', location: 'New Delhi, India', time: '2 hours ago', status: 'success' },
        { device: 'MacBook Pro', location: 'Gurugram, India', time: '1 day ago', status: 'success' },
        { device: 'Windows PC', location: 'Mumbai, India', time: '3 days ago', status: 'failed' }
      ],
      recoveryEmail: 'recovery@example.com',
      backupCodes: 5
    },
    documents: {
      identity: [
        { type: 'Passport', number: 'A1234567', expiryDate: '2028', status: 'active', fileUrl: '#' },
        { type: 'National ID', number: 'B2345678', expiryDate: '2025', status: 'active', fileUrl: '#' }
      ],
      financial: [
        { type: 'Bank Statement', institution: 'HDFC Bank', lastUpdated: '1 month ago', fileUrl: '#' },
        { type: 'Credit Report', institution: 'Experian', lastUpdated: '2 months ago', fileUrl: '#' }
      ],
      others: [
        { name: 'Lease Agreement', category: 'Property', uploadDate: '3 months ago', fileUrl: '#' },
        { name: 'Medical Report', category: 'Health', uploadDate: '6 months ago', fileUrl: '#' }
      ]
    },
    billing: {
      paymentMethods: [
        { type: 'credit', provider: 'visa', lastFour: '1234', expiryDate: '12/24', isDefault: true },
        { type: 'debit', provider: 'mastercard', lastFour: '5678', expiryDate: '11/23', isDefault: false }
      ],
      invoices: [
        { id: 'INV001', date: '01/01/2023', amount: 7999, status: 'paid', downloadUrl: '#' },
        { id: 'INV002', date: '02/01/2023', amount: 7999, status: 'pending', downloadUrl: '#' }
      ],
      subscriptionHistory: [
        { plan: 'Basic Plan', startDate: '01/01/2022', endDate: '12/31/2022', amount: 3999, status: 'expired' },
        { plan: 'Premium Plan', startDate: '01/01/2023', endDate: '12/31/2023', amount: 7999, status: 'active' }
      ]
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <FaUser className="w-5 h-5" /> },
    { id: 'professional', label: 'Professional', icon: <FaBriefcase className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt className="w-5 h-5" /> },
    { id: 'documents', label: 'Documents', icon: <FaIdCard className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <FaCreditCard className="w-5 h-5" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <UserProfileHeader profile={userProfile} />
      
      {/* Modern Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 transition-colors whitespace-nowrap border-b-2 ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600 font-medium' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content with Modern Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <ProfileSection title="Personal Information" icon={<HiOutlineUserCircle className="w-6 h-6 text-indigo-600" />}>
                  <PersonalInfoCard info={userProfile.personalInfo} />
                </ProfileSection>
                <ProfileSection title="Address" icon={<FaMapMarkerAlt className="w-5 h-5 text-indigo-600" />}>
                  <AddressCard address={userProfile.address} />
                </ProfileSection>
                <ProfileSection title="Social Profiles" icon={<FaGlobe className="w-5 h-5 text-indigo-600" />}>
                  <SocialProfilesCard profiles={userProfile.socialProfiles} />
                </ProfileSection>
              </motion.div>
            )}
            
            {activeTab === 'professional' && (
              <motion.div
                key="professional"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileSection title="Professional Information" icon={<FaBriefcase className="w-5 h-5 text-indigo-600" />}>
                  <ProfessionalInfoCard info={userProfile.professionalInfo} />
                </ProfileSection>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileSection title="Security Settings" icon={<FaShieldAlt className="w-5 h-5 text-indigo-600" />}>
                  <SecuritySection security={userProfile.security} />
                </ProfileSection>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div
                key="documents"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileSection title="My Documents" icon={<FaFileAlt className="w-5 h-5 text-indigo-600" />}>
                  <DocumentsSection documents={userProfile.documents} />
                </ProfileSection>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileSection title="Billing & Payments" icon={<FaCreditCard className="w-5 h-5 text-indigo-600" />}>
                  <BillingSection billing={userProfile.billing} />
                </ProfileSection>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar - Enhanced */}
        <div className="space-y-6">
          <ProfileSection title="Subscription" icon={<FaCrown className="w-5 h-5 text-amber-500" />}>
            <div className="space-y-6">
              <div className="p-5 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                
                <div className="relative flex items-start justify-between mb-4">
                  <FaCrown className="w-10 h-10 text-amber-300" />
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    Active
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{userProfile.activeSubscription}</p>
                <div className="flex items-center justify-between text-sm mt-4">
                  <span className="opacity-90">Member since: {userProfile.memberSince}</span>
                  <span className="opacity-90">Next billing: {userProfile.nextBilling}</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Manage Subscription
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 text-center border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
                >
                  View Benefits
                </motion.button>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title="Account Actions" icon={<FaCog className="w-5 h-5 text-indigo-600" />}>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3.5 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FaFileExport className="text-indigo-500" />
                  <span className="font-medium">Export Data</span>
                </div>
                <FaChevronRight className="text-gray-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3.5 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FaKey className="text-indigo-500" />
                  <span className="font-medium">Change Password</span>
                </div>
                <FaChevronRight className="text-gray-400" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3.5 bg-gray-50 rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FaTrash className="text-red-500" />
                  <span className="font-medium">Delete Account</span>
                </div>
                <FaChevronRight className="text-gray-400" />
              </motion.button>
            </div>
          </ProfileSection>
          
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-indigo-900">Security Score</h3>
              <span className="text-sm px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">Good</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full mb-3">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full" 
                style={{ width: `${userProfile.securityScore}%` }}
              ></div>
            </div>
            <p className="text-3xl font-bold text-indigo-700">{userProfile.securityScore}%</p>
            <p className="text-sm text-indigo-600 mt-1">2FA is enabled!</p>
            <button className="mt-4 w-full p-2.5 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors font-medium flex items-center justify-center gap-2">
              <FaShieldAlt /> Improve Security
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;