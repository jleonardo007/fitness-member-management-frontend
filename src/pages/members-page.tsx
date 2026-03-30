import { useEffect, useState } from 'react';
import { UserPlus, Search, X } from 'lucide-react';
import { useMembers } from '@features/members/hooks';
import { MembersTable, MemberDetail } from '@features/members/components';
import { CreateMemberForm } from '@features/members/components';
import { Input, Button, Sheet, SheetContent } from '@components/ui';

const PAGE_SIZE = 20;

export const MembersPage = () => {
  const { members, isLoading, meta, fetchMembers, searchMembers } = useMembers();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);

  useEffect(() => {
    fetchMembers(1, PAGE_SIZE);
  }, [fetchMembers]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    await searchMembers(query.trim());
  };

  const handleClearSearch = async () => {
    setQuery('');
    setIsSearching(false);
    await fetchMembers(1, PAGE_SIZE);
  };

  const handlePageChange = (page: number) => {
    fetchMembers(page, PAGE_SIZE);
  };

  const handleCreateSuccess = () => {
    setShowCreateSheet(false);
    fetchMembers(1, PAGE_SIZE);
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Members</h1>
          <p className='text-sm text-muted-foreground mt-1'>Manage your gym members</p>
        </div>
        <Button onClick={() => setShowCreateSheet(true)} data-testid='add-member-btn'>
          <UserPlus className='w-4 h-4' />
          Add Member
        </Button>
      </div>

      {/* Search */}
      <div className='flex items-center gap-2'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
          <Input
            placeholder='Search by name or email...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className='pl-9'
          />
        </div>
        {isSearching ? (
          <Button variant='ghost' onClick={handleClearSearch}>
            <X className='w-4 h-4' />
            Clear
          </Button>
        ) : (
          <Button variant='secondary' onClick={handleSearch} disabled={!query.trim()}>
            Search
          </Button>
        )}
      </div>

      {/* Table */}
      <MembersTable
        data={members}
        page={meta.page}
        pageSize={meta.pageSize}
        total={meta.total}
        totalPages={meta.totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onViewMember={(id) => setSelectedMemberId(id)}
      />

      {/* Member Detail Sheet */}
      <Sheet open={!!selectedMemberId} onOpenChange={(open) => !open && setSelectedMemberId(null)}>
        <SheetContent title='Member Detail' description='View and manage member information'>
          {selectedMemberId && <MemberDetail id={selectedMemberId} />}
        </SheetContent>
      </Sheet>

      {/* Create Member Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent title='Add Member' description='Create a new gym member'>
          <CreateMemberForm onSuccess={handleCreateSuccess} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
